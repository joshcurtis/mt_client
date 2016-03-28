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

launcher_port = '64811'
launchercmd_port = '53457'
var started = false

// Create sub socket
var socket_sub = zmq.socket("sub")
socket_sub.identity = "joshs-mac"
socket_sub.connect("tcp://134.197.40.182:" + launcher_port)

var dealer = zmq.socket('dealer')
dealer.identity = 'joshs-mac'
dealer.connect("tcp://137.197.40.182:" + launchercmd_port)

socket_sub.on('message', function(topic, msg) {
    var ping = {
	type: mt.message.ContainerType.MT_PING
    }

    var start = {
	type: mt.message.ContainerType.MT_LAUNCHER_START,
	index: msg["index"]
    }

    dealer.send(mt.message.Container.encode(ping))
    if( !started ) {
	dealer.send(mt.message.Container.encode(start))
	started = true
    }
})

dealer.on('message', function(msg) {
    msg = trim(mt.message.Container.decode(msg))
    console.log(msg)
})

console.log("Starting machinekit")
socket_sub.subscribe('launcher')
