import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useHistory } from "react-router-dom";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function NavBar() {
  const { handleSignOutClick } = useContext(UserContext);
  const history = useHistory();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Wag
          </Typography>
          <Button>
            <Link to="/"> Home </Link>
          </Button>
          <Button>
            <Link to="/friends"> Friends </Link>
          </Button>
          <Button>
            <Link to="/chat">Chat</Link>
          </Button>
          <Button>
            <Link to="/foes"> Foes </Link>
          </Button>
          <Button>
            <Link to="/my-profile"> Profile </Link>
          </Button>
          <Button>
            <Link to="/reports">Report</Link>
          </Button>
          <Button
            sx={{ color: "white" }}
            onClick={handleSignOutClick}
          >
            sign out
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;
