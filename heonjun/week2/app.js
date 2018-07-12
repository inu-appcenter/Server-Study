var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/form', function(req, res){
  res.render('form');
});
app.get('/form_receiver', function(req, res) {
  var title = req.query.title;
  var description = req.query.description;
  res.send(title+','+description);
});
app.post('/form_receiver', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  res.send(title+','+description);
});


app.get('/topic/:id', function(req, res) {
  var topics = [
   'Javascript is ...', 'Nodejs is ...', 'Express is ...'];
  var as = `
  <a href="/topic/0">JavaScript</a><br>
  <a href="/topic/1">Nodejs</a><br>
  <a href="/topic/2">Express</a><br><br>
  ${topics[req.params.id]}`
  res.send(as);
});

app.get('/topic/:id/:mode', function(req, res){
  res.send(req.params.id+','+req.params.mode)
});

app.get('/template', function(req,res) {
  res.render('temp', {time:Date(), title:'Jade'});
});

app.get('/', function(req, res){
  res.send('Hello home page');
});

app.get('/dynamic', function(req, res) {
  var lis = '';
  var time = Date();
  for(var i=0; i<5; i++){
   lis += '<li>coding</li>';
  }
  var output = `
  <!DOCTYPE html>
  <html>
   <head>
    <meta charset="utf-8">
    <title>테스트</title>
   </head>
   <body>
    안녕하세요!~!
    ${lis}
    현재 시간은 ${time} 입니다
   </body>
  </html>`;
  res.send(output);
});

app.get('/route', function(req, res){
  res.send('Hello Router, <img src="/images.jpg">');
});

app.get('/login', function(req, res){
  res.send('Login Please');
});


app.listen(52273, function () {
  console.log('Connected port 52273!');
});
