// calculateSalary.controller.js
const { calculateAndSaveSalary } = require('./calculateSalary.service');
const Salary = require('./salary.model');
exports.calculateSalary = async (req, res) => {
  try {
    const { managerId, daysWorked, dailyRate, bonuses, penalties, month } = req.body;
    const result = await calculateAndSaveSalary({ managerId, daysWorked, dailyRate, bonuses, penalties, month });
    res.json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
exports.getSalaryByManagerId = async (req, res) => {
  try {
    const { managerId } = req.params;
    const salary = await Salary.find({ managerId });
    if (!salary) {
      return res.status(404).json({ success: false, message: 'Salary not found' });
    }
    res.json({ success: true, data: salary });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
exports.getSalaryByMonth = async (req, res) => {
  try {
    const { month } = req.params;
    const salary = await Salary.find({ month });
    if (!salary) {
      return res.status(404).json({ success: false, message: 'Salary not found' });
    }
    res.json({ success: true, data: salary });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
exports.getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find();
    if (!salaries) {
      return res.status(404).json({ success: false, message: 'No salaries found' });
    }
    res.json({ success: true, data: salaries });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
exports.updateSalary = async (req, res) => {
    try {
        const { id } = req.params;
        const { daysWorked, dailyRate, bonuses, penalties, month } = req.body;
        const salary = await Salary.findById(id);
        if(!salary) {
            return res.status(404).json({ success: false, message: 'Salary not found' });
        }
        salary.daysWorked = daysWorked;
        salary.dailyRate = dailyRate;
        salary.bonuses = bonuses;
        salary.penalties = penalties;
        salary.month = month;
        await salary.save();
        res.json({ success: true, data: salary });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}
exports.deleteSalary = async (req, res) => {
    try {
        const { id } = req.params;
        const salary = await Salary.findById(id);
        if(!salary) {
            return res.status(404).json({ success: false, message: 'Salary not found' });
        }
        await salary.remove();
        res.json({ success: true, message: 'Salary deleted successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}
exports.requestAdvance = async (req, res) => {
    try {
        const { managerId, amount, reason, month } = req.body;
        const advance = new Salary({
            managerId,
            amount,
            reason,
            month,
            requestedAt: new Date(),
        });
        await advance.save();
        res.json({ success: true, data: advance });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
// exports.getSalaryByManagerId = async (req, res) => {