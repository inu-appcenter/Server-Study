const app = require('express')()
const fs = require('fs')
const urlencode = require('urlencode')
const txtPath = 'test.txt'

app.get('/', (req,res,next)=>{
  if(fs.existsSync(txtPath)){
    fs.readFile(txtPath, (err, data)=>{
      if(err){
        res.sendStatus(404)
        console.error('read file error', err)
      }
      else {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(data)
        res.end()
      }
    })
  }
  else {
    res.sendStatus(404)
  }
  return
})

app.use((req,res,next)=>{
  let str = req.originalUrl.split('/')[1]
  str = urlencode.decode(str)
  if(str != 'favicon.ico'){
    fs.writeFile(txtPath, str, (err)=>{
      if(err) console.error(err)
    })
    console.log(str)
  }
  res.status(200).send(str)
  return
})

app.listen(3000)
