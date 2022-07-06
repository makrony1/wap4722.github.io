var path = require('path');
var http = require('http');
var fs = require('fs');

requestListener = function(req, res){
    fs.readFile(__dirname +"/public/dog.jpg", function (err,data) {
        if (err) {
            console.log(err);
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }
        res.writeHead(200);
        res.end(data);
      });
}

const server = http.createServer(requestListener);
server.listen(8080,()=>{
    console.log('Running on http://localhost:8080/')
});