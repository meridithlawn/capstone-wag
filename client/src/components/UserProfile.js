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

    const {currentUser, handleSignOutClick, handleEditProfile, saveUser} = useContext(UserContext)

    return (
        <div>
            <h1> create user profile</h1>
            <button>{handleSignOutClick}</button>
            <button>{handleEditProfile}</button>
            <button variant='secondary' onClick={toggleForm}>Edit your profile</button>
            {seeForm ? <EditProfileForm /> : null}
            <button variant='secondary' onClick={()=>history.push("api/v1/home")}>Home</button>
        </div>
    )
}

export default UserProfile;