var io = require('socket.io');
var express = require('express');

var app = express.createServer()

var io = io.listen(app);
app.listen(8000);

var messages = [];

io.sockets.on('connection', function (socket) {
  console.log('Client connected');

  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);

    // TODO: name
    messages.push({name:'no name', data:data});
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

/*
io.on('connection',function(client){
	client.on('messages',function(data){
		console.log('data: ' + data);
	});

	console.log('Client connected');
	client.emit('messages', {hello:'world'});
});*/

//app.listen(8000);

