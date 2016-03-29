var mt = require('machinetalk-protobuf');
var zmq = require('zmq');

var Container = mt.message.Container


var trim = function(msg) {
    for (var key in msg) {
	if (msg[key] === null) {
	    delete msg[key]
	} else if (Object.prototype.toString.call(msg[key]) === '[object Array]' &&
		   msg[key].length === 0) {
	    delete msg[key]
	}
    }
    return msg
}


var port = '65159'
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
    console.log(trim(Container.decode(msg)))
})
