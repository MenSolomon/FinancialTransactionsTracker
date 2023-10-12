import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddIncome } from "../../../stateManager/slices/ClientServerSideFunctions";

const Form = () => {
  const dispatch = useDispatch();

  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(AddIncome(inputState));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="Salary"
        name={"title"}
        onChange={handleInput("title")}
      />

      <br />
      <input
        type="text"
        value={category}
        placeholder="Category"
        name={"category"}
        onChange={handleInput("category")}
      />

      <br />

      <input
        type="text"
        value={description}
        placeholder="description"
        name={"description"}
        onChange={handleInput("description")}
      />

      <br />

      <Button type="submit"> Add Income </Button>
    </form>
  );
};

export default Form;
