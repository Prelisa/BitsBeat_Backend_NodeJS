var http=require('http');
var url=require('url');

http.createServer(function(req,res){
res.writeHead(200,{'Content-Type':'text/html'});
res.write('Hello World!');
var q= url.parse(req.url,true).query;
var text=q.year+" "+q.month+" "+q.day;
res.end(text);
}).listen(8001);
console.log("Open8001");
