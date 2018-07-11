const mysql = require('mysql')
const express = require('express')
const app = express()
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // 파일 저장 디렉토리 설정 storage로 설정을하면, dest가 적용되지 않음.
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname)); // 파일 이름 설정 timestamp에 확장자를 붙여 저장.
    }
  });
const upload = multer({storage : storage})

app.use('/', express.static(__dirname + '/uploads'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.get('/upload', (req, res) => {res.render('upload')})
app.post('/upload', upload.single('file'),(req,res,next)=>{
  // res.status(200).send('SUCCESS')
  res.redirect(req.file.filename)
  console.log(req.file)
})

app.listen(3000)
