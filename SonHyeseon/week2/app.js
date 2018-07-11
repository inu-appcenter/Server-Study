var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.locals.pretty = true;
app.set('view engine','pug'); // 템플릿 엔진 (확장자 지정)
app.set('views','./views'); //디렉토리 지정
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'));// 정적파일이 위치할 디렉토리 지정


app.get('/form',function(req,res){
  res.render('form');
})
app.get('/form_receiver',function(req,res){
  // get 방식
  var title = req.query.title;
  var description = req.query.description;
  res.send('Hello, GET : '+title+', '+description);
});
app.post('/form_receiver',function(req,res){
  // post 방식
  var title = req.body.title;
  var description = req.body.description;
  res.send('Hello, POST : '+title+', '+description);
});
app.get('/topic/:id', function(req, res){
  //res.send(req.query.id +','+req.query.name); // id 출력

  var topics = [
    'Javascript is....',
    'Nodejs is...',
    'Express is...'
  ];
  var output = `
  <a href="/topic/0">JavaScript</a><br>
  <a href="/topic/1">Nodejs</a><br>
  <a href="/topic/2">Express</a><br><br>
  ${topics[req.query.id]}
  `
  res.send(output);


})
app.get('/topic/:id/:mode',function(req,res){
  res.send(req.params.id +', '+req.params.mode);
})
app.get('/template',function(req, res){
  res.render('temp', {time:Date(), _title:'Jade'}); // temp파일 렌더링하여 전송
});
app.get('/dynamic',function(req, res){
  var lis = '';
  for(var i=0;i<5;i++){
    lis = lis + `<li>coding</li>`;
  }
  var time = Date();
  var output = `<!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      Hello, Dynamic!
      <ul>
      ${lis}
      </ul>
      ${time}
    </body>
  </html>
`
  res.send(output)
})
app.get('/', function(req, res){
  //home 접속한 사용자에게 수행
  res.send('Hello home page');
});//get 방식으로 접속
app.get('/login', function(req, res){
  res.send('Login please');
});
app.get('/route', function(req, res){
  res.send('Hello Router, <img src="/example.jpg">');
});

app.listen(3000, function(){
  console.log('Connected 3000 port!');
});
