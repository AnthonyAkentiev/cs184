var express = require('express');
var app = express.createServer();
var socket = require('socket.io');
var redis = require('redis');

var redisClient = redis.createClient();
var io = socket.listen(app);

var questions = [];

/*
function storeQuestion(question){
  questions.push({question:question});
  // last 10 questions are stored
  if(questions.length>10){
    questions.shift();
  }
}*/

function storeInRedis(question){
  // turn into string...
  var q = JSON.stringify({data:data});
  
  redisClient.lpush("questions",q,function(err,resp){
    redisClient.ltrim("questions",0,10);
  }); 
}


//////////
io.sockets.on('connection', function(client) {
  console.log("Client connected...");

  client.on('join',function(name){
    client.set('name',name);
    
    redisClient.lrange("questions",0,-1,function(err,questions){
      questions = questions.reverse();

      questions.forEach(function(question){
        var out = JSON.parse(question);
        client.emit('question',out.data);
      });
    });
  });

  client.on('question', function(question) {
    client.get('question_asked',function(err,param){
      if(!param){
        client.broadcast.emit('question', question);
        client.set('question_asked',true);           

	storeQuestion(question);
      }
    }); 
  })
});
