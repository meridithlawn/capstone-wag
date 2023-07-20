import {useState, useContext} from "react";

import {useFormik} from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { UserContext } from '../context/userContext'
import { ErrorContext } from "../context/errorContext";

function EditProfileForm (){
    const history = useHistory()
    const [errors, setErrors] = useState([])
    const {currentUser, saveUser, handleEditProfile} = useContext(UserContext)
    const {saveErrors} = useContext(ErrorContext)

    const userSchema = yup.object({

        username: yup.string().required("Please enter a username"),
        breed: yup.string().required("Please enter your dog's breed"),
        age: yup.string().required("Please enter you dog's age"),
        weight: yup.string().required("Please enter your dog's weight"),
        fixed: yup.string().required("Is your dog spayed/neutered? enter Yes or No"),
        profile_pic: yup.string().required("Please enter a photo url"),
        bio: yup.string().required("update your bio")
    })

    const formik = useFormik({
        initialValues: {
            username: currentUser.username,
            breed: currentUser.breed,
            age: currentUser.age,
            weight: currentUser.weight,
            fixed: "yes or no",
            profile_pic: currentUser.profile_pic,
            bio: "update bio",
        },
// change bio back to currentUser.bio after updating database to avoid null errors from absent bio info
        validationSchema: userSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null));
            console.log("im in fetch")
            handleEditProfile(values, saveErrors)
            // const {first_name, last_name, email, phone, username, password, breed, age, weight, fixed, profile_pic, bio} = values
            // const fixedToBool = fixed.trim() === "yes" ? true : false

            // fetch(`/api/v1//users/${currentDriver.id}`, {
            //     method:"PATCH",
            //     headers: {
            //         "Content-Type": "application/json",   
            //     },
            //     body: JSON.stringify({handler: {first_name, last_name, email, phone}, user: {username, password, breed, age, weight, fixed: fixedToBool, profile_pic, bio}}),
            // })
            // .then((resp) => {
            //     console.log("RESP", resp)
            //     if (resp.ok) {
            //         resp.json()
            //         .then(data => {
            //             saveUser(data)
            //         })
            //     } else {
            //         resp.json()
            //         .then((error) => setErrors(error.message))
            //             // or use setErrors state to update error message
            //     }
            // })
            //     .catch((error) => console.log(error));
            
        },
    });
    return (
        <div>
            <p>{errors}</p>
            <form onSubmit={formik.handleSubmit}>

            <label htmlFor="username">username:</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                />
                {formik.errors.username ? <div>{formik.errors.username}</div> : null}

            <label htmlFor="breed">Breed:</label>
                <input
                    id="breed"
                    name="breed"
                    type="text"
                    placeholder="breed"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.breed}
                />
                {formik.errors.breed ? <div>{formik.errors.breed}</div> : null}

            <label htmlFor="age">Age:</label>
                <input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="age"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.age}
                />
                {formik.errors.age ? <div>{formik.errors.age}</div> : null}

            <label htmlFor="weight">Weight:</label>
                <input
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="weight lbs"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.weight}
                />
                {formik.errors.weight ? <div>{formik.errors.weight}</div> : null}

            <label htmlFor="fixed">Fixed:</label>
                <input
                    id="fixed"
                    name="fixed"
                    type="text"
                    placeholder="spay/neuter?"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fixed}
                />
                {formik.errors.fixed ? <div>{formik.errors.fixed}</div> : null}

            <label htmlFor="profile_pic">Profile Picture URL:</label>
                <input
                    id="profile_pic"
                    name="profile_pic"
                    type="text"
                    placeholder="profile picture url"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.profile_pic}
                />
            <label htmlFor="bio">Bio:</label>
                <input
                    id="bio"
                    name="bio"
                    type="text"
                    placeholder="bio"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.bio}
                />

                {formik.errors.bio ? <div>{formik.errors.bio}</div> : null}

                <button type="submit">Submit</button>

            </form>
        </div>
    )
    
}

export default EditProfileForm