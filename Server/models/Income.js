const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  amount: {
    type: String,
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
  timestamp: {
    type: String,
    default: Date.now(),
  },
});

const Income = mongoose.model("Income", incomeSchema);
module.exports = Income;
