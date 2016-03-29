var mt = require('machinetalk-protobuf');
var zmq = require('zmq');

var Container = mt.message.Container
var port = '53754'
var dealer = zmq.socket('dealer')
dealer.identity = 'joshs-mac'
dealer.onReady = function() {
    console.log("ready")
}

dealer.connect('tcp://134.197.40.182:' + port)

dealer.on('message', function(msg) {
    console.log(Container.decode(msg))
})

var PING = {
    type: mt.message.ContainerType.MT_PING
}

var PING_BUF = Container.encode(PING)
PING_BUF = PING_BUF.buffer.slice(0,3)
setInterval( function() {
    console.log("Pinging")
    dealer.send(PING_BUF)
}, 2000)
