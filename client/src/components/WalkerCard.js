import React from "react"


function WalkerCard ({username, profile_pic, id}) {


    return (
        <div>
            <img src={profile_pic} alt="profilePicture"/>
            <header>{username}</header>
            <h5>{id}</h5>
        </div>
    )
}
export default WalkerCard