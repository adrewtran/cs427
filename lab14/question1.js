const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Sample text content for /about
const aboutText = 'This is the about page content.\nLearn more about our website!';

// File paths for local image and PDF
const imagePath = path.join(__dirname, '..', 'lab13', 'cat.jpg');
const pdfPath = path.join(__dirname, '..', 'lab13', 'dummy.pdf');

// Handle routes
app.get(['/', '/home'], (req, res) => {
  res.status(200).type('text/plain').send('Welcome to my website');
});

app.get('/image', (req, res) => {
  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(404).type('text/plain').send('Image Not Found');
    }
  });
});

app.get('/pdf', (req, res) => {
  res.sendFile(pdfPath, (err) => {
    if (err) {
      res.status(404).type('text/plain').send('PDF Not Found');
    }
  });
});

app.get('/about', (req, res) => {
  res.status(200).type('text/plain').send(aboutText);
});

// 404 for unknown paths
app.use((req, res) => {
  res.status(404).type('text/plain').send('Not Found');
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
