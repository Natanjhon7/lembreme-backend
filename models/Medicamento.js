const mongoose = require('mongoose');

const MedicamentoSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  dosagem: {
    type: String,
    required: true,
  },
  horario: {
    type: String,
    required: true,
  },
  frequencia: {
    type: String,
    enum: ['diario', 'semanal', 'mensal'],
    default: 'diario',
  },
  status: {
    type: String,
    enum: ['pendente', 'tomado', 'perdido'],
    default: 'pendente',
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
  ultimaDose: {
    type: Date,
  },
});

module.exports = mongoose.model('Medicamento', MedicamentoSchema);