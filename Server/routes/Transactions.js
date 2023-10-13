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
  .put("/income/update/:id", UpdateIncome);

module.exports = router;
