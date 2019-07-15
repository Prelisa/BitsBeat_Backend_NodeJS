var url=require('url');
var adr='http://localhost:8001/default.htm?year=2017&month=July';
var q= url.parse(adr,true);
console.log(q.host);
console.log(q.pathname);
console.log(q.search);

var qdata=q.query;
console.log(qdata);
