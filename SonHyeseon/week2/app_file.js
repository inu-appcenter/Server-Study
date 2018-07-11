var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var _storage = multer.diskStorage({
  destination: function (req, file, cb) { // 저장 경로
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {  // 저장 파일명
    cb(null, file.originalname);
  }
})
var upload = multer({ storage: _storage })
// var upload = multer({dest: 'uploads/'}) // upload 목적 디렉토리 지정
var fs = require('fs');
app.use('/user', express.static('uploads'));
app.use(bodyParser.urlencoded({extended:false}));
app.locals.pretty = true;
app.set('views','./views_file');
app.set('view engine','pug');

app.get('/upload', (req,res)=>{
  res.render('upload');
})
app.post('/upload',upload.single('userfile'), (req,res)=>{

  res.send('Uploaded : '+req.file.filename);
})
app.get('/topic/new',function(req, res){
  fs.readdir('data',function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('new', {topics:files});
  });
});
app.get(['/topic','/topic/:id'],function(req, res){
  fs.readdir('data',function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    var id = req.params.id;
    if(id){
      //id값이 있을 때
      fs.readFile('data/'+id, 'utf8', function(err, data){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('view',{title:id, topics:files, description:data});
      })
    }else {
      res.render('view', {topics:files, title:'Welcome',description:'Hello, JavaScript for server.'});
    }
  })
})
// app.get('/topic/:id',function(req, res){
//   var id = req.params.id;
//
//   fs.readdir('data',function(err, files){
//     if(err){
//       console.log(err);
//       res.status(500).send('Internal Server Error');
//     }
//     fs.readFile('data/'+id, 'utf8', function(err, data){
//       if(err){
//           console.log(err);
//           res.status(500).send('Internal Server Error');
//       }
//       res.render('view',{title:id, topics:files, description:data});
//     })
//   })
// })
app.post('/topic',function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title, description, function(err){
      if(err){
        // ex. 존재하지 않는 경로에 접근할 경우
        console.log(err); // 상세한 에러 내용 cmd에 출력
        res.status(500).send('Internal Server Error');
        // send 실행시 다음 코드 실행 x
      }
      // res.send('Success!');
      res.redirect('/topic/'+title);  // 작성한 상세보기 페이지로 이동
  })
})

app.listen(3000, function(){
  console.log('Connected, 3000 port!');
})
