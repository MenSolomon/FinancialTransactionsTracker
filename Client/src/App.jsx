import { NavLink, Route, Routes } from "react-router-dom";
import Homepage from "./Screens/Dashboard";
import Avatar from "@mui/material/Avatar";
import avatarImage from "./assets/images/avatar.jpg";
import TimelineIcon from "@mui/icons-material/Timeline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Dashboard from "./Screens/Dashboard";
import ViewTransactions from "./Screens/ViewTransactions";
import Incomes from "./Screens/Incomes";
import Expenses from "./Screens/Expenses";
import { Button } from "@mui/material";
import NavButton from "./components/Buttons/NavButton";

function App() {
  const NavItemsArray = [
    { path: "/", name: "Dashboard", icon: "timeline" },
    {
      path: "/view-transactions",
      name: "Transactions",
      icon: "credit_card",
    },
    { path: "/incomes", name: "Incomes", icon: "payments" },
    { path: "/expenses", name: "Expenses", icon: "account_balance_wallet" },
  ];

  return (
    <div className="App">
      <div
        style={{
          flex: ".2",
          background: "#F5EEF0",
          borderRadius: "25px",
          border: "4px solid whitesmoke",
          display: "flex",
          flexDirection: "column",
          padding: "2% 1.5%",
        }}
      >
        {/* //AVATAR AREA */}
        <div style={{ flex: ".2", display: "flex" }}>
          <div
            style={{
              flex: ".3",
              // background: "blue",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                // marginLeft: "2vw",
                width: 92,
                height: 92,
                border: "4px solid #FEF7FB",
              }}
              src={avatarImage}
            >
              J
            </Avatar>
          </div>
          <div
            style={{
              flex: ".7",
              paddingLeft: ".4vw",
              // background: "yellow",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {" "}
            <h2>Mike</h2> <h5>Your Money</h5>{" "}
          </div>
        </div>
        <div style={{ flex: ".73" }}>
          <ul style={{ listStyleType: "none" }}>
            {NavItemsArray?.map((data) => {
              const { path, name, icon } = data;

              return (
                <li style={{ marginBottom: "1vh" }}>
                  <NavLink to={path}>
                    <NavButton iconName={icon} label={name} />
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div style={{ flex: ".07" }}>
          <div style={{ cursor: "pointer" }}>
            {" "}
            <ExitToAppIcon sx={{ position: "relative", top: ".5vh" }} /> &nbsp;
            Sign out{" "}
          </div>
        </div>

        {/* <NavLink to="/sa"> Ekow </NavLink> */}
      </div>

      <div
        style={{
          flex: ".8",
          background: "#F5EEF0",
          borderRadius: "25px",
          border: "4px solid whitesmoke",
          padding: "1.5vh 1.5vw",
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/view-transactions" element={<ViewTransactions />} />

          <Route path="/incomes" element={<Incomes />} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
