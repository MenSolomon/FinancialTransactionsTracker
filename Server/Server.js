const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/financial-tracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch(console.error);

const Income = require("./models/Income");

// VIEW ALL INCOMES
app.get("/income", async (req, res) => {
  const incomes = await Income.find();
  res.json(incomes);
});

// POST AN INCOME
app.post("/income/new", async (req, res) => {
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
});

// DELETE ITEM BY ID
app.delete("/income/delete/:id", async (req, res) => {
  const result = await Income.findByIdAndDelete(req.params.id);
  res.json(result);
});

// UPDATNG
app.put("/income/update/:id", async (req, res) => {
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
});

app.listen(3334, () => console.log("server started on port 3334"));
