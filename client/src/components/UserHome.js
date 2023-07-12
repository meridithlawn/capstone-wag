import React, {useState, useEffect} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'

function UserHome({currentUser, handleSignOutClick}){



return (
    <>
        <h1>user home page</h1>
        <button onClick={handleSignOutClick}>sign out</button>
    </>
)


// render list of potential matches, render list of your friends side by side

}
export default UserHome;