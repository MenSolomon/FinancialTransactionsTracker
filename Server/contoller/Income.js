const Income = require("../models/Income");

// VIEW ALL INCOMES
exports.AllIncome = async (req, res) => {
  const incomes = await Income.find();
  res.json(incomes);
};

// POST AN INCOME
exports.PostIncome = async (req, res) => {
  try {
    const newIncome = new Income({
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
      description: req.body.description,
    });

    const savedIncome = await newIncome.save();
    res.status(200).json(savedIncome); // Send a 201 status for successful creation
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE ITEM BY ID
exports.DeleteIncome = async (req, res) => {
  const result = await Income.findByIdAndDelete(req.params.id);
  res.json(result);
};

// UPDATNG
exports.UpdateIncome = async (req, res) => {
  try {
    const incomeElement = await Income.findById(req.params.id);

    // Assuming the new title is sent in the request body as "newTitle"
    const newTitle = req.body.title;

    if (newTitle) {
      incomeElement.title = newTitle;
      await incomeElement.save(); // Use await to ensure the save operation completes

      res.json(incomeElement);
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
