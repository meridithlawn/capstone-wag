import React, { useEffect, useState, useContext } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

function UserCard({username, profile_pic, breed, age, weight, fixed}) {


    return (

        <div>
                <img src={profile_pic} alt="profilePicture"/>
                <header>{username}</header>
                <h5>{age} years old</h5>
                <h5>{breed}</h5>
                <h5>{weight} lbs</h5>
                <h5> add bio</h5>
                <h5>{fixed} fixed bool to string</h5>
                <button>like</button>
                <button>dislike</button>
        </div>
    )

}

export default UserCard;