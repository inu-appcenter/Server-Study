var fs = require('fs');

var data = fs.readFileSync('data.txt', {encoding: 'utf8'});
console.log(data);



fs.readFile('data.txt', {encoding:'utf8'}, function(err, data){
	console.log(data);
});
