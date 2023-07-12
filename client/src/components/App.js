import React, { useEffect, useState, useContext } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
// import {useContext} from 'react'

import { UserContext } from '../context/userContext'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import UserHome from './UserHome'

function App() {
// Code goes here!



// if you don't want/need to use all of the values, you can destructure to just one ones you need in this component
const {currentUser, } = useContext(UserContext) 
// -> include whichever values you want to inherit in the curly braces to destructure

const [showSignInForm, setShowSignInForm] = useState(false)



const handleToggleForm = () => {
  setShowSignInForm(currentVal => !currentVal);
};

// const saveUser = (new_user) => {
//   setCurrentUser(new_user)
// }

// const handleSignOutClick= () => {
//   fetch("/api/v1/signout", {method: "DELETE"})
  
//     .then((resp) => {
//       if (resp.ok){
//       setCurrentUser(null); 
//       }
    
//   });
// }

// useEffect(() => {
//   fetch("/api/v1/check-user")
//   .then(response => {
//     if (response.ok){
//       response.json()
//       .then(saveUser)
//     }
//   })
//   }, [])


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
          <UserHome />
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
