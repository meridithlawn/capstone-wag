import {useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../context/userContext'
import { useHistory } from "react-router-dom";



function NavBar() {

  const { handleSignOutClick } = useContext(UserContext)
  const history = useHistory()
  return (
    <>
      <button onClick={() => {handleSignOutClick().then(() => history.push('/'))}}>sign out</button>
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