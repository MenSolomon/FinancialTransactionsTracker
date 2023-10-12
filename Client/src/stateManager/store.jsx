import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import incomeReducer from "./slices/incomeSlice";
import ClientServerFunctionsReducer from "./slices/ClientServerSideFunctions";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  // files: incomeReducer,
  ClientServerFunctions: ClientServerFunctionsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
