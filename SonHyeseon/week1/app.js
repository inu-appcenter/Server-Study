//entry readFile

var express = require('express');
var app = express();

app.get('/', function(req, res){
  //home 접속한 사용자에게 수행
  res.send('Hello home page');
});//get 방식으로 접속

app.get('/login', function(req, res){
  res.send('Login please');
});

app.get('/join', function(req, res){
  res.send('Join page');
});

app.listen(3000, function(){
  console.log('Connected 3000 port!');
  // localhost:3000 접속
});
