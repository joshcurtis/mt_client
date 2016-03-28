machinetalk-protobuf-node
=========================

Protobuf declarations of Machinetalk for Node.js.

This project is the result of converting the protobuf declarations of [machinetalk-protobuf](https://github.com/machinekit/machinetalk-protobuf) to CommonJS files using [ProtoBuf.JS](https://github.com/dcodeIO/ProtoBuf.js).

This means this project uses the same API as ProtoBuf.JS.

## Installation

```
npm install machinetalk-protobuf
```

## Usage

### Encoding a message container

```js
var machinetalkProtobuf = require('machinetalk-protobuf');

// Define the message we want to encode.
var messageContainer = {
  type: machinetalkProtobuf.message.ContainerType.MT_PING
};

// Encode the message.
var encodedMessageContainer = machinetalkProtobuf.message.Container.encode(messageContainer);

// Strip off excess bytes from the resulting buffer.
var encodedBuffer = encodedMessageContainer.buffer.slice(encodedMessageContainer.offset, encodedMessageContainer.limit);

// Print the buffer.
console.log(encodedBuffer);

```
This results in:
```
<Buffer 08 d2 01>
```

### Decoding a message container
```js
var machinetalkProtobuf = require('../index.js');

var encodedBuffer = new Buffer([0x08, 0xd2, 0x01]);

// Decode the message.
var decodedMessageContainer = machinetalkProtobuf.message.Container.decode(encodedBuffer);

// decodedMessageContainer.type === machinetalkProtobuf.message.ContainerType.MT_PING
```
