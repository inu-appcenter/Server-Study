var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var _storage = multer.diskStorage({
  destination: function(req, file, cb) { // 저장 경로
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) { // 저장 파일명
    cb(null, file.originalname);
  }
})
var upload = multer({
  storage: _storage
})
// var upload = multer({dest: 'uploads/'}) // upload 목적 디렉토리 지정
var fs = require('fs');
var mysql = require('mysql')
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '111111',
  database: 'o2'
})
conn.connect();

app.use('/user', express.static('uploads'));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.locals.pretty = true;

app.set('views', './views_mysql');
app.set('view engine', 'pug');

app.get(['/topic', '/topic/:id'], function(req, res) {
  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, function(err, topics) {
    if (err) {
      console.log(err);
      res.status(500).send('first while Internal Server Error');
    } else {
      var id = req.params.id;
      if (id) {
        var sql = 'SELECT * FROM topic WHERE id=?';
        conn.query(sql, [id], function(err, topic) {
          if (err) {
            console.log(err);
            res.status(500).send('second while Internal Server Error');
          } else {
            console.log(topic)
            res.render('view', {
              topics: topics,
              topic: topic[0]
            });
          }
        });
      } else {
        res.render('view', {
          topics: topics
        });
      }
    }
  });
});
app.get('/topic/add', function(req, res) {
  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, function(err, topics) {
    if (err) {
      console.log(err);
      res.status(500).send('first while Internal Server Error');
    }
    res.render('add', {
      topics: topics
    })
  });
});
app.post('/topic/add', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'insert into topic(title,description,author) values(?,?,?)';
  conn.query(sql, [title, description, author], (err, rows, fields) => {
    if (err) {
      console.log(err); // 상세한 에러 내용 cmd에 출력
      res.status(500).send('Internal Server Error');
    }
    // res.send(rows);
    res.redirect('/topic/' + rows.insertId); // 작성한 상세보기 페이지로 이동
  })
})
app.get(['/topic/:id/edit'], function(req, res) {
  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, function(err, topics) {
    var id = req.params.id;
    if (id) {
      var sql = 'SELECT * FROM topic WHERE id=?';
      conn.query(sql, [id], function(err, topic) {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          console.log(topic)
          res.render('edit', {
            topics: topics,
            topic: topic[0]
          });
        }
      });
    } else {
      console.log('There is no id.');
      res.status(500).send('Internal Server Error');
    }
  });
});
app.post(['/topic/:id/edit'], function(req, res) {
  var sql='update topic set title=?, description=?,author=? where id=?'
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var id = req.params.id;
  conn.query(sql,[title,description,author,id],(err,rows)=>{
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error')
    }else{
        res.redirect('/topic/'+id)
    }
  })
});
app.get(['/topic/:id/delete'], function(req, res){
  var sql = 'SELECT id, title FROM topic';
  var id = req.params.id;
  conn.query(sql, function(err, topics) {
    var sql = 'select * from topic where id=?'
    conn.query(sql,[id],(err,topic)=>{
      if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
      }else{
        if(topic.length==0){
            console.log('There is no record.');
            res.status(500).send('Internal Server Error');
        }else{
      res.render('delete', {topics:topics,topic:topic[0]});
    }
    }
    })
  })
});
app.post(['/topic/:id/delete'], function(req, res){
  var sql = 'SELECT id, title FROM topic';
  var id = req.params.id;
  conn.query(sql, function(err, topics) {
    var sql = 'delete from topic where id=?'
    conn.query(sql,[id],(err,topic)=>{
      res.redirect('/topic');
    })
  })
});

app.listen(3000, function() {
  console.log('Connected, 3000 port!');
})
