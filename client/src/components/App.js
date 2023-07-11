import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import UserHome from './UserHome'

function App() {
// Code goes here!

const history = useHistory()

const [showSignInForm, setShowSignInForm] = useState(false)
const [currentUser, setCurrentUser] = useState(null)


const handleToggleForm = () => {
  setShowSignInForm(currentVal => !currentVal);
};

const handleSignoutClick= () => {
  fetch("/api/v1/signout", {method: "DELETE"})
    .then(res => {
      if(res.ok) {
        setCurrentUser(null);
        // history.push('/authentication') the ix version
        // following line goes to authentication route, check where I want to redirect to
        history.push('/authentication')
      } 
    })
  }

if (!currentUser) {
  return (
    <>
    <header> WAG </header>
    <navbar>
      {!showSignInForm ? <SignInForm/> : <SignUpForm  handleToggleForm={handleToggleForm}/>}
    </navbar>
    <img src="https://barx.flywheelsites.com/wp-content/uploads/2021/08/english-springer-spaniel-pair-scaled-1-1024x768.jpeg" alt="!"/>
    </>
    )
  }  
  return (
    <div>
      <Switch>
        <Route path = '/home'>
          <UserHome handleSignoutClick={handleSignoutClick}/>
        </Route>
        {/* <Route exact path = '/'> 
          <DriverProfile currentDriver={currentDriver} handleSignoutClick={handleSignoutClick} saveDriver={saveDriver} saveNewCar={saveNewCar} setCars={setCars} saveNewDrive={saveNewDrive} addDriveToUser={addDriveToUser}/>
        </Route>
        <Route path="/cars">
          <CarCollection cars={cars} setCars={setCars} currentDriver={currentDriver}handleSignoutClick={handleSignoutClick}/>
        </Route>  */}
      </Switch>
    </div>
  );

}

export default App;
