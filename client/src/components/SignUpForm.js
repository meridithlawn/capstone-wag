// import React, { useEffect, useState } from "react";
import {useState} from "react";
import {useFormik} from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

function SignUpForm ({saveUser, handleToggleForm}){
    const history = useHistory()
    const [errors, setErrors] = useState([])

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
        profile_pic: yup.string().required("Please enter photo url")
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
        },

        validationSchema: userSchema,
        onSubmit: (values, {resetForm}) => {
            // alert(JSON.stringify(values, null));
            console.log("im in fetch")
            const {first_name, last_name, email, phone, username, password, breed, age, weight, fixed, profile_pic} = values
            fetch("/api/v1/signup", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",   
                },
                body: JSON.stringify({handler: {first_name, last_name, email, phone}, user: {username, password, breed, age, weight, fixed, profile_pic}}),
            })
            .then((resp) => {
                console.log("RESP", resp)
                if (resp.ok) {
                    resp.json()
                    .then(data => {
                        saveUser(data)
                        resetForm({values: ""});
                        history.push('/home')
                    })
                } else {
                    resp.json()
                    .then((error) => setErrors(error.message))
                        // or use setErrors state to update error message
                }
            })
                .catch((error) => console.log(error));
            
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
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                />
            <label htmlFor="last_name">last name:</label>
                <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                />
            <label htmlFor="email">email:</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
            <label htmlFor="phone">phone:</label>
                <input
                    id="phone"
                    name="phone"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                />
            <label htmlFor="username">Userame:</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />

            <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />

            <label htmlFor="breed">Breed:</label>
                <input
                    id="breed"
                    name="breed"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.breed}
                />

            <label htmlFor="age">Age:</label>
                <input
                    id="age"
                    name="age"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.age}
                />

            <label htmlFor="weight">Weight:</label>
                <input
                    id="weight"
                    name="weight"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.weight}
                />

            <label htmlFor="fixed">Fixed:</label>
                <input
                    id="fixed"
                    name="fixed"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.fixed}
                />

            <label htmlFor="profile_pic">Profile Picture URL:</label>
                <input
                    id="profile_pic"
                    name="profile_pic"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.profile_pic}
                />

                <button type="submit">Submit</button>

            </form>

            <button onClick={handleToggleForm}>
            Already have an account? Sign in
            </button>
        </div>
    )
    
}

export default SignUpForm