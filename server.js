const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.log('Erro:', err));

// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/medicamentos', require('./routes/medicamentos'));

app.listen(3000, () => console.log('Servidor na porta 3000'));