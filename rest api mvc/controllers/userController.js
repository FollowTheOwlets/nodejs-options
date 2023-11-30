const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.use(express.json());

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const existingUser = UserService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = UserService.addUser({ username, email, password: hashedPassword });
    const token = jwt.sign({ id: newUser.id, username: newUser.username }, process.env.SECRET_KEY);
    res.json({ user: newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = UserService.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY);
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', authenticateToken, (req, res) => {
  const users = UserService.getAllUsers();
  res.json(users);
});

router.post('/', (req, res) => {
  const { username, email } = req.body;
  try {
    const newUser = UserService.addUser({ username, email });
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:userId', authenticateToken, (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = UserService.getUserById(userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

router.put('/:userId', authenticateToken, (req, res) => {
  const userId = parseInt(req.params.userId);
  const { email } = req.body;
  try {
    const updatedUser = UserService.updateUser(userId, { email });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:userId', authenticateToken, (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    UserService.deleteUser(userId);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ error: 'User not found' });
  }
});

module.exports = router;