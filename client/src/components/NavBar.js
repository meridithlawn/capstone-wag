import {useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../context/userContext'



function NavBar() {

  const { handleSignOutClick } = useContext(UserContext)
  return (
    <>
      <button onClick={handleSignOutClick}>sign out</button>
      <Link to="/"> Home </Link>
      <Link to="/friends"> Friends </Link>
      <Link to="/chat">Chat</Link>
      <Link to="/foes"> Foes </Link>
      <Link to="/my-profile"> Profile </Link>
      <Link to="/reports">Report</Link>
    </>
  );
};

export default NavBar;