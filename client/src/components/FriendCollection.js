import React from "react";
import FriendCard from './FriendCard'

function FriendCollection ({mappedFriends}){

    return (
        <div>
            <FriendCard mappedFriends={mappedFriends}/>
        </div>
    )
}

export default FriendCollection;