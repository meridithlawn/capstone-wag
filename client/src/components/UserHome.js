import React, {useState, useEffect, useContext} from 'react'
// import {useHistory} from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { Route, Switch } from 'react-router-dom'
import UserCard from './UserCard'
import FoeCollection from './FoeCollection'
import FriendCollection from './FriendCollection'
import UserProfile from './UserProfile'
import ReportForm from './ReportForm'

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

    // const mappedUsers = allUsers.map(user => <UserCard key={user.id} {...user}/>)

    
    const filteredUserCategoryNegOne = allUsers.filter(user => currentUser.get_neg_interactions.includes(user.id))
        console.log("foes", filteredUserCategoryNegOne)
    

    const filteredUserCategoryPosOne = allUsers.filter(user => currentUser.get_users_w_pos_interactions.includes(user.id))
        console.log("friends", filteredUserCategoryPosOne)
  

    // maybe need to iterate through currentUser.sent_interactions then compare to all users. maybe below method is backwards?

    // const filteredUserCategoryNew = allUsers.filter((user) => {
    //     const newList = []
    //     if (currentUser.sent_interactions.receiver_id !== (user.id)) {
    //         newList.push(user)
    //     }
    //     return newList
    // })

    const filteredUserCategoryNew = allUsers.filter (user => currentUser.sent_interactions.receiver_id !== user.id)


    const mappedNewUsers = filteredUserCategoryNew.map(user => <UserCard key={user.id} {...user}/>)
    console.log("FILTERED CAT NEW", filteredUserCategoryNew)



return (
    <>
    
        <h1>Nice to see you, {currentUser.username}!</h1>
        <button onClick={handleSignOutClick}>sign out</button>
        <h2>find new friends</h2>
        <div>
            {mappedNewUsers}
        </div>
        <Switch>
        <Route path= '/foes'>
            <FoeCollection filteredUserCategoryNegOne={filteredUserCategoryNegOne}/>
        </Route>
        <Route path='/friends'>
            <FriendCollection mfilteredUserCategoryPosOne={filteredUserCategoryPosOne}/>
        </Route>
        <Route path='/my-profile'>
            <UserProfile/>
        </Route>
        <Route path='/reports'>
            <ReportForm/>
        </Route>
        </Switch>
        </>
)


// render list of potential matches, render list of your friends side by side

}
export default UserHome;