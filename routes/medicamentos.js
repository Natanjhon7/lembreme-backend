const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Medicamento = require('../models/Medicamento');

function getUsuarioId(req) {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, 'chave_secreta');
  return decoded.userId;
}

router.get('/', async (req, res) => {
  const usuarioId = getUsuarioId(req);
  const medicamentos = await Medicamento.find({ usuarioId });
  res.json(medicamentos);
});

router.post('/', async (req, res) => {
  const usuarioId = getUsuarioId(req);
  const { nome, dosagem, horario, frequencia } = req.body;
  const medicamento = await Medicamento.create({
    usuarioId, nome, dosagem, horario, frequencia
  });
  res.status(201).json(medicamento);
});

router.put('/:id', async (req, res) => {
  const usuarioId = getUsuarioId(req);
  const medicamento = await Medicamento.findOneAndUpdate(
    { _id: req.params.id, usuarioId },
    req.body,
    { new: true }
  );
  res.json(medicamento);
});

router.delete('/:id', async (req, res) => {
  const usuarioId = getUsuarioId(req);
  await Medicamento.findOneAndDelete({ _id: req.params.id, usuarioId });
  res.json({ message: 'Medicamento excluído' });
});

router.patch('/:id/tomar', async (req, res) => {
  const usuarioId = getUsuarioId(req);
  const medicamento = await Medicamento.findOneAndUpdate(
    { _id: req.params.id, usuarioId },
    { status: 'tomado' },
    { new: true }
  );
  res.json(medicamento);
});

module.exports = router;