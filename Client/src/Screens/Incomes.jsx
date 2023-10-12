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

  const API_BASE = "http://localhost:3334";

  const TextFieldArrays = ["Title", "Amount", "Category", "Description"];

  useEffect(() => {
    GetInomes();

    console.log(incomes, "All Incomes");
  }, []);

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
      <div style={{ flex: ".1" }}>
        <h2>Incomes</h2>
      </div>

      <div style={{ flex: ".9", display: "flex", gap: "2vw" }}>
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
