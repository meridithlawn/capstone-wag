import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

function App() {
// Code goes here!

const [showLoginForm, setShowLoginForm] = useState(false)
const [currentUser, setCurrentUser] = useState(null)


const handleToggleForm = () => {
  setShowLoginForm(currentVal => !currentVal);
};

const handleSignoutClick= () => {
  fetch("/api/v1/signout", {method: "DELETE"})
    .then(() => {
    setCurrentUser(null); 
    
  }, );
}

if (!currentDriver) {
  return (
    <>
    <header> WAG </header>
    <navbar>
      {!showLoginForm ? <LoginForm/> : <NewUserForm  handleToggleForm={handleToggleForm}/>}
    </navbar>
    <img src="https://wallpapercave.com/wp/wp7611213.jpg" alt="!"/>
    </>
    )
  }  
  return (
    <div>
      <Switch>
        <Route path = '/home'>
          <UserCollection handleSignoutClick={handleSignoutClick}/>
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
