import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

export const ClientServerSideFunctions = createSlice({
  name: "ClientServerFunctions",
  initialState: {
    Income: {},
    Expense: [],
    Transaction: [],
    uploadedFiles: [],
    selectedFilesToDelete: [],
  },

  reducers: {
    AddIncome: (state, action) => {
      state.Income = action.payload;

      const response = axios
        .post(`${BASE_URL}add-income`, action.payload)
        .catch((err) => {
          console.log(err);
        });

      response();
      console.log("Add income function", state.Income);
    },
  },
});

export const { AddIncome } = ClientServerSideFunctions.actions;
export default ClientServerSideFunctions.reducer;
