import React from "react"
import WalkerCard from "./WalkerCard"


function CurrentlyWalking ({currentlyWalkingFriends}) {
    
    const mappedWalking = currentlyWalkingFriends && currentlyWalkingFriends.map(user => <WalkerCard key={user.id} {...user}/>)
    return  (
        <div>
            <h1> Currently Walking</h1>
            {mappedWalking}
        </div>
    )
}

export default CurrentlyWalking