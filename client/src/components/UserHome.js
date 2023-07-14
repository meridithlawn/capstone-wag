import React, {useState, useEffect, useContext} from 'react'
// import {useHistory} from 'react-router-dom'
import { UserContext } from '../context/userContext'
import UserCard from './UserCard'
import FriendCard from './FriendCard'
import FoeCard from './FoeCard'
import FoeCollection from './FoeCollection'
import FriendCollection from './FriendCollection'

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
        console.log("foes", filteredUserCategoryNegOne)
    const mappedFoes = filteredUserCategoryNegOne.map(user => <FoeCard key={user.id}{...user}/>)

    const filteredUserCategoryPosOne = allUsers.filter(user => currentUser.get_users_w_pos_interactions.includes(user.id))
        console.log("friends", filteredUserCategoryPosOne)
    const mappedFriends = filteredUserCategoryPosOne.map(user => <FriendCard key={user.id} {...user}/>)

    // const filteredUserCategoryNew = allUsers.filter(user => currentUser.includes(users_i_reacted_to.id))

    // const filteredUserCategoryNull = allUsers.filter(user => !currentUser.get_user_interactions.includes(user.id))
    //     console.log("We haven't met yet", filteredUserCategoryNull)


return (
    <>
        <h1>Nice to see you, {currentUser.username}!</h1>
        <button onClick={handleSignOutClick}>sign out</button>
        <h2>find new friends</h2>
        <div>
            {mappedUsers}
        </div>
        <FoeCollection mappedFoes={mappedFoes}/>
        <FriendCollection mappedFriends={mappedFriends}/>
        
        </>
)


// render list of potential matches, render list of your friends side by side

}
export default UserHome;