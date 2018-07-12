var express = require('express');
var app = express();
var multer = require('multer');
var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: _storage });
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1q2w3e4r',
  database : 'o2'
});
conn.connect();
app.locals.pretty = true;
app.use('/user', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', './views_mysql');
app.set('view engine', 'jade');
app.get('/upload', function(req, res) {
  res.render('uploadform');
});
app.post('/upload', upload.single('userfile'), function(req, res) {
  console.log(req.file);
  res.send('Uploaded : '+req.file.originalname);
});
app.get('/topic/add', function(req, res) {
  var sql = 'select id,title from topic';
  conn.query(sql, function(err, topics, fields){
   if(err){
    console.log(err);
    res.status(500).send('Internal Server Error');
   } 
   res.render('add', {topics:topics});
  });
});
app.get(['/topic/:id/edit'], function(req, res) {
  var sql = 'select id,title from topic';
  conn.query(sql, function(err, topics, fields){
   var id = req.params.id;
   if(id){
    var sql = 'select * from topic where id =?';
    conn.query(sql, [id], function(err, topic, fields){
     if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
     } else {
       res.render('edit', {topics:topics, topic:topic[0]});
     }
   });
   } else {
     console.log('There is no id');
     res.status(500).send('Internal Server Error');
   }
 });
});

app.post(['/topic/:id/edit'], function(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var id = req.params.id;
  var sql = 'update topic set title=?, description=?, author=? where id=?';
  conn.query(sql, [title, description, author, id], function(err, rows, fields) {
   if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
     } else {
       res.redirect('/topic/'+id);
     }

 });
});

app.get('/topic/:id/delete', function(req, res) {
  var sql = 'select id,title from topic';
  var id = req.params.id;
  conn.query(sql, function(err, topics, fields){
   var sql = 'select * from topic where id=?';
   conn.query(sql, [id], function(err, topic){
     if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
     } else {
          if(topic.length === 0){
            console.log('There is no record');
            res.status(500).send('Internal Server Error');
          } else {
          res.render('delete', {topics:topics, topic:topic[0]});
          }  
     }
   });
  });
});

app.post('/topic/:id/delete', function(req, res) {
  var id =req.params.id;
  var sql = 'delete from topic where id=?';
  conn.query(sql, [id], function(err, result){
    res.redirect('/topic/');
  });
 
});

app.get(['/topic', '/topic/:id'], function(req, res) {
  var sql = 'select id,title from topic';
  conn.query(sql, function(err, topics, fields){
   var id = req.params.id;
   if(id){
    var sql = 'select * from topic where id =?';
    conn.query(sql, [id], function(err, topic, fields){
     if(err){
    	  console.log(err);
          res.status(500).send('Internal Server Error');
     } else {
       res.render('view', {topics:topics, topic:topic[0]});
     }
   });
   } else {
    res.render('view', {topics:topics});
   }
 });
});
app.post('/topic/add', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'insert into topic (title, description, author) values (?, ?, ?)';
  conn.query(sql, [title, description, author], function(err, results, fields) {
   if(err){
    console.log(err);
    res.status(500).send('Internal Server Error');
   } else {
    res.redirect('/topic/'+results.insertId);
   }
  });
});
app.listen(52273, function() {
  console.log('Connect 52273 port');
});
