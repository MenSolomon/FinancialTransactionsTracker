import React, { useEffect, useState } from "react";
import Form from "../components/Buttons/Forms/Form";
import { Button, IconButton, TextField } from "@mui/material";
import { Add, Circle, Delete, Euro, Wallet } from "@mui/icons-material";
import InomeDisplayCards from "../components/Cards/InomeDisplayCards";
// DATEPICKER
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Expenses = () => {
  const [expenses, setexpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [Totalexpense, setTotalexpense] = useState(0);

  const API_BASE = "http://localhost:3334/api/v1";

  const TextFieldArrays = ["Title", "Amount", "Category", "Description"];

  const getTotalAmount = (data) => {
    // Use the reduce method to sum the 'amount' property of each object
    const total = data.reduce((acc, obj) => acc + obj.amount, 0);
    return total;
  };

  useEffect(() => {
    GetInomes();

    console.log(expenses, "All expenses", Totalexpense);
  }, []);

  useEffect(() => {
    const totalAmount = getTotalAmount(expenses);

    setTotalexpense(totalAmount);
  }, [expenses]);

  const GetInomes = () => {
    fetch(API_BASE + "/expense")
      .then((res) => res.json())
      .then((data) => setexpenses(data))
      .catch((err) => console.error("Error:", err));
  };

  useEffect(() => {
    console.log({
      title,
      amount,
      category,
      description,
      date,
    });
  }, [category, amount, description, title, date]);

  //  ADDING NEW ICOME;
  const addexpense = async () => {
    if (title.length > 0) {
      const data = await fetch(API_BASE + "/expense/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          amount,
          category,
          description,
          date,
        }),
      }).then((res) => res.json());

      setexpenses([...expenses, data]);

      setTitle("");
      setAmount("");
      setCategory("");
      setDescription("");
    } else {
      alert("Title is required");
    }

    // setPopupActive(false);
    // setNewTodo("");
  };

  // DELETEING expense
  const deleteexpense = async (id) => {
    const data = await fetch(API_BASE + "/expense/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setexpenses((expenses) =>
      expenses.filter((expense) => expense._id !== data._id)
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      {/* / HEADER */}
      <div style={{ flex: ".2" }}>
        <h2>Expenses</h2>

        <div
          style={{
            display: "grid",
            width: "100%",
            background: "#FAF6F9",
            height: "12vh",
            borderRadius: "1.4vw",
            padding: ".8vh",
            marginBottom: "1.5vh",
            placeContent: "center",
            color: "green",
          }}
        >
          <h3 style={{ display: "flex", alignItems: "center", gap: ".6vw" }}>
            {" "}
            Total expenses: <Euro /> {Totalexpense.toString()}
          </h3>
        </div>
      </div>

      <div style={{ flex: ".7", display: "flex", gap: "2vw" }}>
        {/* // TEXT FIELD */}
        <div style={{ flex: ".3" }}>
          {TextFieldArrays.map((data, index) => {
            if (data === "Description") {
              return (
                <TextField
                  key={index}
                  multiline
                  rows={4}
                  id="outlined-basic"
                  label={data}
                  value={description}
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  fullWidth
                />
              );
            } else {
              return (
                <TextField
                  key={index}
                  size="small"
                  id="outlined-basic"
                  label={data}
                  variant="outlined"
                  type={data === "Amount" ? "number" : "text"}
                  value={
                    data === "Title"
                      ? title
                      : data === "Amount"
                      ? amount
                      : category
                  }
                  onChange={(e) => {
                    switch (data) {
                      case "Title":
                        setTitle(e.target.value);
                        break;
                      case "Amount":
                        setAmount(e.target.value);
                        break;
                      case "Category":
                        setCategory(e.target.value);
                        break;
                    }
                  }}
                  sx={{ marginBottom: 2 }}
                  fullWidth
                />
              );
            }
          })}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: 275, marginBottom: 1 }}
              onChange={(e) => {
                setDate(e.$d);
                console.log(e.$d, "Date change", e);
              }}
            />
          </LocalizationProvider>

          {/* <input type="date" /> */}

          {/* // BUTTON AREA  */}
          <Button
            startIcon={<Add />}
            style={{
              background: "#D86793",
              color: "white",
              textTransform: "none",
              borderRadius: "20px",
              width: "11vw",
              height: "6vh",
            }}
            onClick={addexpense}
          >
            {" "}
            Add Expense{" "}
          </Button>
        </div>
        {/* DISPLAY expenseS AS CARDS */}
        <div style={{ flex: ".7" }}>
          {expenses.map((data, index) => {
            const { title, amount, category, description, _id } = data;

            return (
              <InomeDisplayCards
                key={index}
                Title={title}
                Amount={amount}
                Category={category}
                handleDeleteClick={() => deleteexpense(_id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
