var mt = require('machinetalk-protobuf');
var zmq = require('zmq');
var utils = require('utils');
var Container = mt.message.Container

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
    console.log(utils.trim(Container.decode(msg)))
    console.log("Shutting down")
})
