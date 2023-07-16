import React from "react";
import FriendCard from './FriendCard'

function FriendCollection ({filteredUserCategoryPosOne}){

    const mappedFriends = filteredUserCategoryPosOne.map(user => <FriendCard key={user.id} {...user}/>)

    return (
        <div> <h1>friends</h1>
            {mappedFriends}
        </div>
    )
}

export default FriendCollection;