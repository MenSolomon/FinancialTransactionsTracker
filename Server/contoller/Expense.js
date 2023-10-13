const Expense = require("../models/Expense");

// VIEW ALL ExpenseS
exports.AllExpense = async (req, res) => {
  const Expenses = await Expense.find();
  res.json(Expenses);
};

// POST AN Expense
exports.PostExpense = async (req, res) => {
  try {
    const newExpense = new Expense({
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
      description: req.body.description,
      date: req.body.date,
    });

    const savedExpense = await newExpense.save();
    res.status(200).json(savedExpense); // Send a 201 status for successful creation
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE ITEM BY ID
exports.DeleteExpense = async (req, res) => {
  const result = await Expense.findByIdAndDelete(req.params.id);
  res.json(result);
};

// UPDATNG
exports.UpdateExpense = async (req, res) => {
  try {
    const ExpenseElement = await Expense.findById(req.params.id);

    // Assuming the new title is sent in the request body as "newTitle"
    const newTitle = req.body.title;

    if (newTitle) {
      ExpenseElement.title = newTitle;
      await ExpenseElement.save(); // Use await to ensure the save operation completes

      res.json(ExpenseElement);
    } else {
      res
        .status(400)
        .json({ error: "Invalid or missing newTitle in the request body" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
