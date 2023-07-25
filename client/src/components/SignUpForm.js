// import React, { useEffect, useState } from "react";
// https://formik.org/docs/tutorial to see how to implement useContext with formik
import {useState, useContext} from "react";

import {useFormik} from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { UserContext } from '../context/userContext'
import { ErrorContext } from "../context/errorContext";

function SignUpForm ({handleToggleForm}){

    const history = useHistory()

    const [errors, setErrors] = useState([])

    const {currentUser, handleSignUp} = useContext(UserContext)
    const { saveErrors } = useContext(ErrorContext)

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
        bio: yup.string().required("Please describe your dog")
    })

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            username: "",
            password: "",
            breed: "",
            age: "",
            weight: "",
            fixed: "",
            profile_pic: "",
            bio: "",
        },

        validationSchema: userSchema,
        onSubmit: (values, {resetForm}) => {
            // alert(JSON.stringify(values, null));
            console.log("im in fetch")
            handleSignUp(values, resetForm, saveErrors)            
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

            <label htmlFor="username">Username:</label>
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
                {formik.errors.profile_pic ? <div>{formik.errors.profile_pic}</div> : null}

            <label htmlFor="bio">bio:</label>
                <input
                    id="bio"
                    name="bio"
                    type="text"
                    placeholder="bio"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.bio}  
                />
                <button type="submit">Submit</button>

            </form>

            <button onClick={handleToggleForm}>
            Already have an account?
            </button>
        </div>
    )
    
}

export default SignUpForm

// password nullable false to model
// add currently walking to model
// add bio to sign up form
// need to put user bio in profile edit form interpolate currentuser bio
// profile pic nullable false to model and password nullable false to User model
// added validations to models
// add currently walking status to friend card, add currently walking button and status to user profile