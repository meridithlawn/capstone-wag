import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import {useContext} from 'react'

import { ProjectContext } from '../context/projectContext'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import UserHome from './UserHome'

function App() {
// Code goes here!

//this holds all of the values from useContext in projectContext
const context = useContext(ProjectContext)
// if you don't want/need to use all of the values, you can destructure to just one ones you need in this component
// const {projects} = useContext(ProjectContext) -> include whichever values you want to inherit in the curly braces to destructure
const [currentUser, setCurrentUser] = useState(false)
const [showSignInForm, setShowSignInForm] = useState(false)



const handleToggleForm = () => {
  setShowSignInForm(currentVal => !currentVal);
};

const saveUser = (new_user) => {
  setCurrentUser(new_user)
}


if (!currentUser) {
  return (
    <>
    <header> WAG </header>
    <navbar>
      {!showSignInForm ? <SignInForm saveUser={saveUser} handleToggleForm={handleToggleForm}/> : <SignUpForm saveUser={saveUser} handleToggleForm={handleToggleForm}/>}
  
   </navbar>
    <img src="https://barx.flywheelsites.com/wp-content/uploads/2021/08/english-springer-spaniel-pair-scaled-1-1024x768.jpeg" alt="!"/>
    </>
    )
  }  
  return (
    <div>
      <Switch>
        <Route path = '/home'>
          <UserHome/>
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
