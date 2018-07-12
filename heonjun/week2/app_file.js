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
app.locals.pretty = true;
app.use('/user', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', './views_file');
app.set('view engine', 'jade');
app.get('/upload', function(req, res) {
  res.render('uploadform');
});
app.post('/upload', upload.single('userfile'), function(req, res) {
  console.log(req.file);
  res.send('Uploaded : '+req.file.originalname);
});
app.get('/topic/new', function(req, res) {
  fs.readdir('data', function(err, files) {
   if(err){
    console.log(err);
    res.status(500).send('Internal Server Error');
   }
   res.render('new', {topics:files});
 });
});
app.get(['/topic', '/topic/:id'], function(req, res) {
  fs.readdir('data', function(err, files) {
   if(err){
    console.log(err);
    res.status(500).send('Internal Server Error');
   }
   var id = req.params.id;
   if(id){
    fs.readFile('data/'+id, 'utf8', function(err, data) {
     if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
     }
     res.render('view', {topics:files, title:id, description:data});
    })
   } else {
   res.render('view', {topics:files, title:'Welcom', description:'Hello, JavaScript for server'});
   }
 })
});
app.post('/topic', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title, description, function(err){
   if(err){
    console.log(err);
    res.status(500).send('Internal Server Error');
   }
   res.redirect('/topic/'+title);
 } );
});
app.listen(52273, function() {
  console.log('Connect 52273 port');
});
