const http = require('http');

//Khởi tạo server
const server = http.createServer((req, res) => {
  // Xử lý yêu cầu
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Home Page</h1>');
    res.end();
  } 
  else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>About Page</h1>');
    res.end();
  } 
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h1>404 Not Found</h1>');
    res.end();
  }
});

//Start server ở cổng 3000
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});