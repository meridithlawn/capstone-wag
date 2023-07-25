import {useContext} from "react";
import { UserContext } from "../context/userContext";

function UserCard({id, username, profile_pic, breed, age, weight, fixed, bio}) {

    const {handleLikeClick, handleDislikeClick} = useContext(UserContext)

    return (

        <div>
                <img src={profile_pic} alt="profilePicture"/>
                <header>{username}</header>
                <h5>{age} years old</h5>
                <h5>{breed}</h5>
                <h5>{weight} lbs</h5>
                <h5>{fixed} fixed bool to string </h5>
                <h5> {bio} </h5>
                <button onClick={()=>handleLikeClick({receiver_id: id})}>like</button>
                <button onClick={()=>handleDislikeClick({receiver_id: id})}>dislike</button>
        </div>
    )

}

export default UserCard;