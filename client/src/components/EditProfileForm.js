import {useState, useContext} from "react";

import {useFormik} from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { UserContext } from '../context/userContext'

function EditProfileForm (){
    const history = useHistory()
    const [errors, setErrors] = useState([])
    const {currentUser, saveUser, handleEditProfile} = useContext(UserContext)

    const userSchema = yup.object({
        first_name: yup.string().required("Please enter first name"),
        last_name: yup.string().required("Please enter last name"),
        email: yup.string().required("Please enter email"),
        phone: yup.string().required("Please enter 10 digit phone number"),
        username: yup.string().required("Please enter a username"),
        password: yup.string().required("Please enter a valid password"),
        breed: yup.string().required("Please enter your dog's breed"),
        age: yup.string().required("Please enter you dog's age"),
        weight: yup.string().required("Please enter your dog's weight"),
        fixed: yup.string().required("Please enter yes if your dog is spayed/neutered, no if not"),
        profile_pic: yup.string().required("Please enter photo url"),
        bio: yup.string().required("update your bio")
    })

    const formik = useFormik({
        initialValues: {
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            email: currentUser.email,
            phone: currentUser.phone,
            username: currentUser.username,
            breed: currentUser.breed,
            age: currentUser.age,
            weight: currentUser.weight,
            fixed: currentUser.fixed,
            profile_pic: currentUser.profile_pic,
            bio: "",
        },

        validationSchema: userSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null));
            console.log("im in fetch")
            handleEditProfile(values, setErrors)
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

            <label htmlFor="first_name">first name:</label>
                <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="first name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.first_name}
                />
                {formik.errors.first_name ? <div>{formik.errors.first_name}</div> : null}

            <label htmlFor="last_name">last name:</label>
                <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="last name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.last_name}
                />
                {formik.errors.last_name ? <div>{formik.errors.last_name}</div> : null}

            <label htmlFor="email">email:</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}

            <label htmlFor="phone">phone:</label>
                <input
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="phone number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                />
                {formik.errors.phone ? <div>{formik.errors.phone}</div> : null}

            <label htmlFor="username">Userame:</label>
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

            <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.errors.password ? <div>{formik.errors.password}</div> : null}

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