const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middlewares to parse different request formats
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Calculator router
const calculatorRouter = express.Router();

// Helper function to extract numbers from request
function getNumbers(req) {
  if (req.params.a && req.params.b) {
    return {
      a: parseFloat(req.params.a),
      b: parseFloat(req.params.b)
    };
  }
  
  // Try to get numbers from query parameters
  if (req.query.a && req.query.b) {
    return {
      a: parseFloat(req.query.a),
      b: parseFloat(req.query.b)
    };
  }
  
  // Try to get numbers from request body (JSON or urlencoded)
  if (req.body.a && req.body.b) {
    return {
      a: parseFloat(req.body.a),
      b: parseFloat(req.body.b)
    };
  }
  
  // Default
  return { a: 0, b: 0 };
}

// Addition endpoints
calculatorRouter.all('/add', (req, res) => {
  const { a, b } = getNumbers(req);
  res.json({ results: a + b });
});

calculatorRouter.all('/add/:a', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = req.query.b ? parseFloat(req.query.b) : (req.body.b ? parseFloat(req.body.b) : 0);
  res.json({ results: a + b });
});

calculatorRouter.all('/add/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  res.json({ results: a + b });
});

// Subtraction endpoints
calculatorRouter.all('/subtract', (req, res) => {
  const { a, b } = getNumbers(req);
  res.json({ results: a - b });
});

calculatorRouter.all('/subtract/:a', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = req.query.b ? parseFloat(req.query.b) : (req.body.b ? parseFloat(req.body.b) : 0);
  res.json({ results: a - b });
});

calculatorRouter.all('/subtract/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  res.json({ results: a - b });
});

// Multiplication endpoints
calculatorRouter.all('/multiply', (req, res) => {
  const { a, b } = getNumbers(req);
  res.json({ results: a * b });
});

calculatorRouter.all('/multiply/:a', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = req.query.b ? parseFloat(req.query.b) : (req.body.b ? parseFloat(req.body.b) : 0);
  res.json({ results: a * b });
});

calculatorRouter.all('/multiply/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  res.json({ results: a * b });
});

// Division endpoints
calculatorRouter.all('/divide', (req, res) => {
  const { a, b } = getNumbers(req);
  if (b === 0) {
    return res.status(400).json({ error: 'Cannot divide by zero' });
  }
  res.json({ results: a / b });
});

calculatorRouter.all('/divide/:a', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = req.query.b ? parseFloat(req.query.b) : (req.body.b ? parseFloat(req.body.b) : 0);
  if (b === 0) {
    return res.status(400).json({ error: 'Cannot divide by zero' });
  }
  res.json({ results: a / b });
});

calculatorRouter.all('/divide/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  if (b === 0) {
    return res.status(400).json({ error: 'Cannot divide by zero' });
  }
  res.json({ results: a / b });
});

// Modulus endpoints
calculatorRouter.all('/modulo', (req, res) => {
  const { a, b } = getNumbers(req);
  if (b === 0) {
    return res.status(400).json({ error: 'Cannot perform modulo with zero' });
  }
  res.json({ results: a % b });
});

calculatorRouter.all('/modulo/:a', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = req.query.b ? parseFloat(req.query.b) : (req.body.b ? parseFloat(req.body.b) : 0);
  if (b === 0) {
    return res.status(400).json({ error: 'Cannot perform modulo with zero' });
  }
  res.json({ results: a % b });
});

calculatorRouter.all('/modulo/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  if (b === 0) {
    return res.status(400).json({ error: 'Cannot perform modulo with zero' });
  }
  res.json({ results: a % b });
});

// Alternative syntax with direct parameters in URL for addition
calculatorRouter.all('/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  res.json({ results: a + b }); // Default to addition
});

// Mount the calculator router
app.use('/calculator', calculatorRouter);

// Root path for direct operations
app.use('/', calculatorRouter);

// Start the server
const PORT = 3001; // Using a different port from question1.js
app.listen(PORT, () => {
  console.log(`Calculator API running at http://localhost:${PORT}/`);
});

module.exports = app; // For testing purposes
