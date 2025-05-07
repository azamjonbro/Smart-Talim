// salary.model.js
const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager', required: true },
  month: { type: String, required: true }, 
  baseSalary: { type: Number, required: true },
  bonuses: { type: Number, default: 0 },
  penalties: { type: Number, default: 0 },
  totalPaid: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ManagerSalary', SalarySchema);
