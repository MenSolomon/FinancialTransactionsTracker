const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  amount: {
    type: Number,
  },
  category: {
    type: String,
    trim: true,
    maxLength: 20,
  },
  description: {
    type: String,
    trim: true,
    maxLength: 40,
  },
  date: {
    type: String,
    require: true,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
