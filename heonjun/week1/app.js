var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('Hello home page'); 
});

app.get('/login', function(req, res){
  res.send('Login Please');
});


app.listen(52273, function () {
  console.log('Connected port 52273!');
});
