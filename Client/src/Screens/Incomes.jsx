import React, { useEffect, useState } from "react";
import Form from "../components/Buttons/Forms/Form";
import { Button, IconButton, TextField } from "@mui/material";
import { Add, Circle, Delete, Euro, Wallet } from "@mui/icons-material";
import InomeDisplayCards from "../components/Cards/InomeDisplayCards";

const Incomes = () => {
  const [incomes, setIncomes] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [TotalIncome, setTotalIncome] = useState(0);

  const API_BASE = "http://localhost:3334/api/v1";

  const TextFieldArrays = ["Title", "Amount", "Category", "Description"];

  const getTotalAmount = (data) => {
    // Use the reduce method to sum the 'amount' property of each object
    const total = data.reduce((acc, obj) => acc + obj.amount, 0);
    return total;
  };

  useEffect(() => {
    GetInomes();

    console.log(incomes, "All Incomes", TotalIncome);
  }, []);

  useEffect(() => {
    const totalAmount = getTotalAmount(incomes);

    setTotalIncome(totalAmount);
  }, [incomes]);

  const GetInomes = () => {
    fetch(API_BASE + "/income")
      .then((res) => res.json())
      .then((data) => setIncomes(data))
      .catch((err) => console.error("Error:", err));
  };

  useEffect(() => {
    console.log({
      title,
      amount,
      category,
      description,
    });
  }, [category, amount, description, title]);

  //  ADDING NEW ICOME;
  const addIncome = async () => {
    if (title.length > 0) {
      const data = await fetch(API_BASE + "/income/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          amount,
          category,
          description,
        }),
      }).then((res) => res.json());

      setIncomes([...incomes, data]);

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

  // DELETEING INCOME
  const deleteIncome = async (id) => {
    const data = await fetch(API_BASE + "/income/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setIncomes((incomes) =>
      incomes.filter((income) => income._id !== data._id)
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
        <h2>Incomes</h2>

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
            Total income: <Euro /> {TotalIncome.toString()}
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
            onClick={addIncome}
          >
            {" "}
            Add Income{" "}
          </Button>
        </div>
        {/* DISPLAY INCOMES AS CARDS */}
        <div style={{ flex: ".7" }}>
          {incomes.map((data, index) => {
            const { title, amount, category, description, _id } = data;

            return (
              <InomeDisplayCards
                key={index}
                Title={title}
                Amount={amount}
                Category={category}
                handleDeleteClick={() => deleteIncome(_id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Incomes;
