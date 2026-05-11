const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const senhaHash = await bcrypt.hash(senha, 10);
    const user = await User.create({ nome, email, senha: senhaHash });
    res.status(201).json({ message: 'Conta criada com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: 'Email já existe' });
  }
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });
  
  const senhaValida = await bcrypt.compare(senha, user.senha);
  if (!senhaValida) return res.status(401).json({ error: 'Senha incorreta' });
  
  const token = jwt.sign({ userId: user._id }, 'chave_secreta', { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, nome: user.nome, email: user.email } });
});

module.exports = router;