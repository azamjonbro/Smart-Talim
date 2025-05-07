// calculateSalary.service.js
const Salary = require('./salary.model');

async function calculateAndSaveSalary({ managerId, daysWorked, dailyRate, bonuses = 0, penalties = 0, month }) {
  const baseSalary = daysWorked * dailyRate;
  const totalPaid = baseSalary + bonuses - penalties;

  // Check if manager already has salary for that month
  let existingSalary = await Salary.findOne({ managerId, month });

  if (existingSalary) {
    // Add to existing
    existingSalary.baseSalary += baseSalary;
    existingSalary.bonuses += bonuses;
    existingSalary.penalties += penalties;
    existingSalary.totalPaid += totalPaid;
    await existingSalary.save();
    return existingSalary;
  } else {
    // Create new
    const newSalary = new Salary({
      managerId,
      month,
      baseSalary,
      bonuses,
      penalties,
      totalPaid
    });
    await newSalary.save();
    return newSalary;
  }
}

module.exports = { calculateAndSaveSalary };
