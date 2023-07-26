import {useContext} from "react";
import { UserContext } from "../context/userContext";

function FriendCard({username, profile_pic, breed, age, weight, fixed, bio, id}) {

    const {handleDislikeClick} = useContext(UserContext)

    return (

        <div>
                <img src={profile_pic} alt="profilePicture"/>
                <header>{username}</header>
                <h5>{id}</h5>
                <h5>{age} years old</h5>
                <h5>{breed}</h5>    
                <h5>{weight} lbs</h5>
                <h5> {bio}</h5>
                <h5>{fixed} fixed bool to string</h5>
                <button onClick={handleDislikeClick}>dislike</button>
        </div>
    )

}

export default FriendCard