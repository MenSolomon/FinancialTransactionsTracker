import { Button, Icon } from "@mui/material";

const NavButton = ({ iconName, label }) => {
  return (
    <Button
      className="NavBarBtns"
      style={{
        fontSize: ".7em",
        fontWeight: "600",
        textTransform: "none",
        paddingRight: "5vw",
        color: "black",
      }}
      startIcon={<Icon>{iconName}</Icon>}
    >
      {" "}
      {label}{" "}
    </Button>
  );
};

export default NavButton;
