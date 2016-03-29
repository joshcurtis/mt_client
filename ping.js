var mt = require('machinetalk-protobuf');
var zmq = require('zmq');
var utils = require('./utils.js');

var Container = mt.message.Container

var port = '64272'
var dealer = zmq.socket('dealer')
dealer.identity = 'batman'
dealer.connect('tcp://134.197.40.182:' + port)

var PING = {
    type: mt.message.ContainerType.MT_PING
}
var BUFFER = Container.encode(PING)
BUFFER = BUFFER.buffer.slice(0, BUFFER.limit)

setInterval(function() {
    dealer.send(BUFFER)
}, 5000)

dealer.on('message', function(msg) {
    console.log(utils.trim(Container.decode(msg)))
})
