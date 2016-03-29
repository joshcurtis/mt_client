var mt = require('machinetalk-protobuf');
var zmq = require('zmq');
var utils = require('./utils.js');
var Container = mt.message.Container

var port = '60523'
var statusSocket = zmq.socket("sub")
statusSocket.identity = 'Jessica Jones'
statusSocket.connect("tcp://134.197.40.182:" + port)

statusSocket.on('message', function(topic, msg) {
    msg = utils.trim(Container.decode(msg))
    console.log("Received message on " + topic)
    console.log(msg)
})

statusSocket.on('motionstatuschanged', function(status) {
    console.log(status);
})




// motion
// task
// io
// config
// interp are all possible

statusSocket.subscribe('motion')
