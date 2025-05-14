const http = require('http');
const url = require('url');
const fs = require('fs');

// Sample text content for /about
const aboutText = 'This is the about page content.\nLearn more about our website!';

// File paths for local image and PDF (assumed in same directory as server.js)
const imagePath = 'lab13/cat.jpg';
const pdfPath = 'lab13/dummy.pdf';
// Create the HTTP server
const server = http.createServer((req, res) => {
  // Parse the URL and get the pathname
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle routes
  if (method === 'GET') {
    if (pathname === '/home' || pathname === '/') {
      // Route: /home or /
      res.writeHeader(200, { 'Content-Type': 'text/plain' });
      res.end('Welcome to my website');
    } else if (pathname === '/image') {
      // Route: /image
      fs.readFile(imagePath, (err, data) => {
        if (err) {
          res.writeHeader(404, { 'Content-Type': 'text/plain' });
          res.end('Image Not Found');
          return;
        }
        res.writeHeader(200, { 'Content-Type': 'image/jpg' });
        res.end(data);
      });
    } else if (pathname === '/pdf') {
      // Route: /pdf
      fs.readFile(pdfPath, (err, data) => {
        if (err) {
          res.writeHeader(404, { 'Content-Type': 'text/plain' });
          res.end('PDF Not Found');
          return;
        }
        res.writeHeader(200, { 'Content-Type': 'application/pdf' });
        res.end(data);
      });
    } else if (pathname === '/about') {
      // Route: /about
      res.writeHeader(200, { 'Content-Type': 'text/plain' });
      res.end(aboutText);
    } else {
      // 404 for unknown paths
      res.writeHeader(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } else {
    // 404 for non-GET methods
    res.writeHeader(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});