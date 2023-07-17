import React, { useEffect, useState, useContext } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
// import {useContext} from 'react'

import { UserContext } from '../context/userContext'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import UserHome from './UserHome'
import FoeCollection from "./FoeCollection";
import FriendCollection from "./FriendCollection";
import UserProfile from "./UserProfile";
import ReportForm from "./ReportForm";


function App() {
// Code goes here!

// if you don't want/need to use all of the values, you can destructure to just one ones you need in this component
const {currentUser, } = useContext(UserContext) 
// -> include whichever values you want to inherit in the curly braces to destructure

const [showSignInForm, setShowSignInForm] = useState(false)



const handleToggleForm = () => {
  setShowSignInForm(currentVal => !currentVal);
};


const [allUsers, setAllUsers] = useState([]);

useEffect(() => {
  fetch("/api/v1/users")
    .then((response) => response.json())
    .then((data) => {
      setAllUsers(data);
    });
}, []);

console.log("all users,", allUsers);



if (!currentUser) {
  return (
    <>
    <header>
      {!showSignInForm ? <SignInForm handleToggleForm={handleToggleForm}/> : <SignUpForm handleToggleForm={handleToggleForm}/>}
    </header>
    <img src="https://barx.flywheelsites.com/wp-content/uploads/2021/08/english-springer-spaniel-pair-scaled-1-1024x768.jpeg" alt="!"/>
    </>
    )
  }  
  return (
    <div>
      <Switch>
        <Route path = '/home'>
          <UserHome 
          allUsers={allUsers}
          />
        </Route>
        <Route exact path="/foes">
          <FoeCollection
            allUsers={allUsers}
          />
        </Route>
        <Route exact path="/friends">
          <FriendCollection
            allUsers={allUsers}
          />
        </Route>
        <Route exact path="/my-profile">
          <UserProfile />
        </Route>
        <Route exact path="/reports">
          <ReportForm />
        </Route>
      </Switch>
    </div>
  );

}

export default App;
