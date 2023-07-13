import React, {useState, useEffect, useContext} from 'react'
// import {useHistory} from 'react-router-dom'
import { UserContext } from '../context/userContext'
import UserCard from './UserCard'

function UserHome(){
    const {handleSignOutClick, currentUser} = useContext(UserContext)

    // const history = useHistory()
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        fetch("/api/v1/users")
        .then(response => response.json())
        .then(data => {
            setAllUsers(data)
        })
        }, []) 
    
        console.log("all users,", allUsers)

    const mappedUsers = allUsers.map(user => <UserCard key={user.id} {...user}/>)

    const filteredUserCategoryNegOne = allUsers.filter(user => currentUser.get_neg_interactions.includes(user.id))
        console.log(filteredUserCategoryNegOne)
    // const user_category_zero =
    // const user_category_pos_one = 


return (
    <>
        <h1>Nice to see you, {currentUser.username}!</h1>
        <h2>find new friends</h2>
        <div>
            {mappedUsers}
        </div>
        <h2>my friends currently walking</h2>
        <div>
            {mappedUsers}
        </div>
        <button onClick={handleSignOutClick}>sign out</button>
    </>
)


// render list of potential matches, render list of your friends side by side

}
export default UserHome;