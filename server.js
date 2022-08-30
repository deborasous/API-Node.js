const http = require('node:http')

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    res.end(JSON.stringify({
      message: 'Hello World!'
    }));
}).listen(4001, () => console.log('Olllllaaaaa'))