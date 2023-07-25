import React from "react";

function FriendCard({username, profile_pic, breed, age, weight, fixed, id}) {


    return (

        <div>
                <img src={profile_pic} alt="profilePicture"/>
                <header>{username}</header>
                <h5>{id}</h5>
                <h5>{age} years old</h5>
                <h5>{breed}</h5>
                <h5>{weight} lbs</h5>
                <h5> add bio</h5>
                <h5>{fixed} fixed bool to string</h5>
                {/* <h5>{currentlyWalking}</h5> */}
                <button>dislike</button>
        </div>
    )

}

export default FriendCard