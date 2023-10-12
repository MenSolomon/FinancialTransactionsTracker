import { Circle, Delete, Euro, Wallet } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

const InomeDisplayCards = ({ Title, Amount, Category, handleDeleteClick }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        background: "#FAF6F9",
        height: "12vh",
        borderRadius: "1.4vw",
        padding: ".8vh",
        marginBottom: "1.5vh",
      }}
    >
      <div style={{ flex: ".13", display: "grid", placeItems: "center" }}>
        {" "}
        <Wallet sx={{ color: "#291F5C", width: 50 }} />{" "}
      </div>
      <div style={{ flex: ".77" }}>
        <h4 style={{ margin: 0, display: "flex", alignItems: "center" }}>
          {" "}
          <Circle sx={{ color: "green", marginRight: 1, width: 8 }} /> {Title}
        </h4>
        <h5 style={{ margin: 0, display: "flex", alignItems: "center" }}>
          {" "}
          <Euro sx={{ marginRight: 1, width: 14 }} /> {Amount}{" "}
          &nbsp;&nbsp;&nbsp;
          {Category && Category?.length > 15
            ? Category.substring(0, 15) + "..."
            : Category}
        </h5>
      </div>
      <div
        style={{
          flex: ".1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton onClick={handleDeleteClick} sx={{ background: "#291F5C" }}>
          {" "}
          <Delete className="deleteIcon" sx={{ color: "white" }} />{" "}
        </IconButton>
      </div>
    </div>
  );
};

export default InomeDisplayCards;
