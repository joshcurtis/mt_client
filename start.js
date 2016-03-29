var mt = require('machinetalk-protobuf');
var zmq = require('zmq');

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

var PING = {
    type: mt.message.ContainerType.MT_PING
}
var PING_BUF = mt.message.Container.encode(PING)
PING_BUF = PING_BUF.buffer.slice(0, PING_BUF.limit)


launcher_port = '63121'
launchercmd_port = '50356'
var started = false

// Create sub socket
var socket_sub = zmq.socket("sub")
socket_sub.identity = "socket subscriber"
socket_sub.connect("tcp://134.197.40.182:" + launcher_port)

var dealer = zmq.socket('dealer')
dealer.identity = 'dealer'
dealer.connect("tcp://134.197.40.182:" + launchercmd_port)

socket_sub.on('message', function(topic, msg) {
    msg = trim(mt.message.Container.decode(msg))
    console.log(msg)
    dealer.send(PING_BUF)

    if( !started ) {
	console.log(msg)
	var start = {
	    type: mt.message.ContainerType.MT_LAUNCHER_START,
	    index: msg["launcher"][0]["index"]
	}
	console.log(start)
	var start_buf = mt.message.Container.encode(start)
	start_buf = start_buf.buffer.slice(0, start_buf.limit)
	dealer.send(start_buf)
	started = true
    }



})

dealer.on('message', function(msg) {
    msg = trim(mt.message.Container.decode(msg))
//    console.log(msg)
})

console.log("Starting machinekit")
socket_sub.subscribe('launcher')
