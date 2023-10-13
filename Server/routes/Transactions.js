const {
  AllExpense,
  PostExpense,
  DeleteExpense,
  UpdateExpense,
} = require("../contoller/Expense");
const {
  AllIncome,
  PostIncome,
  DeleteIncome,
  UpdateIncome,
} = require("../contoller/Income");

const router = require("express").Router();

router
  .post("/income/new", PostIncome)
  .get("/income", AllIncome)
  .delete("/income/delete/:id", DeleteIncome)
  .put("/income/update/:id", UpdateIncome)
  .post("/expense/new", PostExpense)
  .get("/expense", AllExpense)
  .delete("/expense/delete/:id", DeleteExpense)
  .put("/expense/update/:id", UpdateExpense);

module.exports = router;
