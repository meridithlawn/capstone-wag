import {Switch, Route, useHistory} from "react-router-dom";
import {useContext, useState} from "react"
import { UserContext } from "../context/userContext"; 
import EditProfileForm from "./EditProfileForm";

function UserProfile () {

    const [seeForm, setSeeForm] = useState(false) //profile update
    const history = useHistory()

    const toggleForm = () => {
        setSeeForm(currentVal => !currentVal)
    }

    const {currentUser, handleDelete, handleCurrentlyWalking} = useContext(UserContext)

    return (
        <div>
            <img src={currentUser.profile_pic} alt="profilePicture"/>
                <header>{currentUser.username}</header>
                <h5>{currentUser.age} years old</h5>
                <h5>{currentUser.breed}</h5>
                <h5>{currentUser.weight} lbs</h5>
                <h5>{currentUser.fixed} how to show bool to string</h5>
                <h5> {currentUser.bio} </h5>
            <button onClick={handleCurrentlyWalking}> Currently Walking </button>
            <button onClick={handleDelete}>Delete Profile</button>
            <button variant='secondary' onClick={toggleForm}>Edit your profile</button>
            {seeForm ? <EditProfileForm /> : null}
        </div>
    )
}

export default UserProfile;