const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

const cors = require('cors');

// Configure CORS
app.use(cors({
  origin: 'http://localhost:8080', // Frontend origin
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

const SECRET_KEY = 'ABcdEfghIjklMNO1234'; // Use an environment variable in a real app

// Simulated user database
const users = [];

// Register route
app.post('/register', (req, res) => {
  console.log('Request received:', req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ message: 'Username and password are required' });
  }

  // Check if the user already exists
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return res.status(400).send({ message: 'User already exists' });
  }

  // Add new user to the "database" (storing password in plain text)
  users.push({ username, password });
  res.status(201).send({ message: 'User registered successfully!' });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Compare the provided password with the stored plain text password
  if (user.password === password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '20s' }); // Token expires in 20 seconds
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('Token is required');
  }

  // Extract token from "Bearer <token>" format
  const tokenPart = token.split(' ')[1]; // Get the token part (after "Bearer")
  if (!tokenPart) {
    return res.status(403).send('Token format is incorrect');
  }

  jwt.verify(tokenPart, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid or expired token');
    }
    req.user = decoded; // Attach the decoded user data to the request
    next(); // Continue to the protected route
  });
};

// Protected route
app.get('/protected', verifyToken, (req, res) => {
  res.send('This is a protected route');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
