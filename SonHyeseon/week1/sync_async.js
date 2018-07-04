var fs = require('fs');

//Sync
console.log(1);
var data = ""
data += fs.readFileSync('data.txt', {endcoding:'utf8'});
console.log(data);
console.log(fs.readFileSync('data.txt',{encoding:'utf8'}));
//Async
console.log(2);
fs.readFile('data.txt',{encoding:'utf8'},function(err,data){
  console.log(3);
  console.log(data);
});
console.log(4);
