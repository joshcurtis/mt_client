var mt = require('machinetalk-protobuf');
var zmq = require('zmq');
var utils = require('./utils.js')
var Container = mt.message.Container

ip = "tcp://134.197.40.182:"
launcher_port = '50500'
launcher_cmd_port = '57323'

// Create sub socket
var launcherSocket = zmq.socket("sub")
launcherSocket.identity = "Wilson Fisk"
launcherSocket.connect(ip + launcher_port)

var launcherCmdSocket = zmq.socket('dealer')
launcherCmdSocket.identity = 'Saul Goodman'
launcherCmdSocket.connect(ip + launcher_cmd_port)


launcherSocket.on('message', function(topic, msg) {
    console.log(mt.message.Container.decode(msg))
    msg = utils.trim(mt.message.Container.decode(msg))
    console.log(msg)
})


launcherCmdSocket.on('message', function(msg) {
    console.log(mt.message.Container.decode(msg))
    msg = utils.trim()
    console.log(msg)
})

launcherSocket.subscribe('launcher');


var start = Container.encode({
    type: mt.message.ContainerType.MT_LAUNCHER_START,
    index: 0})
var buffer = start.buffer.slice(0, start.limit)

launcherCmdSocket.send(buffer)
