var mysql = require('mysql')
var conn = mysql.createConnection({
  host  : 'localhost',
  user  : 'root',
  password : '111111',
  database : 'o2'
})
conn.connect();

// var sql = 'SELECT * FROM topic';
// conn.query(sql,(err,rows,fields)=>{
//   if(err){
//     console.log(err);
//   }else {
//     for(var i=0;i<rows.length;i++){
//       console.log(rows[i].title+'\t'+rows[i].description+'\t'+rows[i].author);
//     }
//   }
// });

// var sql='insert into topic (title, description, author) values(?,?,?)';
//var sql='update topic set title=?,description=? where id=?';
var sql='delete from topic where id=?';
var params=[1]
conn.query(sql,params, (err,rows,fields)=>{
  if(err){
    console.log(err);
  }else{
    console.log(rows);
  }
})


conn.end();
