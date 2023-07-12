import React, {useState, useEffect, useContext} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'
import { UserContext } from '../context/userContext'

function UserHome(){
const {handleSignOutClick, currentUser} = useContext(UserContext)


return (
    <>
        <h1>user home page</h1>
        <button onClick={handleSignOutClick}>sign out</button>
    </>
)


// render list of potential matches, render list of your friends side by side

}
export default UserHome;