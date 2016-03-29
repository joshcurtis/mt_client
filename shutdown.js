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

// This should be port of service command
var port = '51949'
var dealer = zmq.socket('dealer')
dealer.identity = 'daredevil'
dealer.connect('tcp://134.197.40.182:' + port)

var SHUTDOWN = {
    type: mt.message.ContainerType.MT_SHUTDOWN
}

var BUFFER = Container.encode(SHUTDOWN)
BUFFER = BUFFER.buffer.slice(0, BUFFER.limit)
dealer.send(BUFFER)

dealer.on('message', function(msg) {
    console.log(trim(Container.decode(msg)))
    console.log("Shutting down")
})
