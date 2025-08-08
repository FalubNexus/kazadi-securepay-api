const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/userModel');
const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { email, password } = req.body;
  if (userModel.findByEmail(email)) return res.status(400).json({ error: 'Email déjà utilisé' });
  const hash = await bcrypt.hash(password, 10);
  const id = uuidv4();
  userModel.createUser({ id, email, passwordHash: hash });
  const token = jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = userModel.findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ error: 'Identifiants invalides' });
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
};