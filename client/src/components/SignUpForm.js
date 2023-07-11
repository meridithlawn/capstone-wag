import React from "react";
import {useFormik} from "formik";
import * as yup from "yup";

function SignUpForm ({saveUser, handleToggleForm}){
    const userSchema = yup.object({
        username: yup.string().required("Please enter a username"),
        _password_hash: yup.string().required("Please enter a valid password"),
        breed: yup.string().required("Please enter your dog's breed"),
        age: yup.string().required("Please enter you dog's age"),
        weight: yup.string().required("Please enter your dog's weight"),
        fixed: yup.string().required("Please enter yes if your dog is spayed/neutered, no if not"),
        profile_pic: yup.string().required("Please enter photo url")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            _password_hash: "",
            breed: "",
            age: "",
            weight: "",
            fixed: "",
            profie_pic: "",
        },
        validationSchema: userSchema,
        onSubmit: values => {
            // alert(JSON.stringify(values, null));
            console.log("im in fetch")
            fetch("/api/v1/signup", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",   
                },
                body: JSON.stringify(values, null, 2),
            }).then(resp => {
                console.log("RESP", resp)
                if (resp.ok) {
                    resp.json()
                    .then(user => {
                        saveUser(user)
                    })
                }
                else {
                    resp.json()
                    .then(errorObj => {
                        alert(errorObj.error)
                    })
                }
            })
        },
    });
    return (
        <div>
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Userame:</label>
            <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
            />

            <label htmlFor="_password_hash">Password:</label>
            <input
                id="_password_hash"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values._password_hash}
            />

            <label htmlFor="email">Breed:</label>
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
                type="text"
                onChange={formik.handleChange}
                value={formik.values.weight}
            />

            <label htmlFor="fixed">Fixed:</label>
            <input
                id="fixed"
                name="fixed"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.age}
            />

            <label htmlFor="profile_picture">Profile Picture URL:</label>
            <input
                id="profile_pic"
                name="profile_pic"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.profile_pic}
            />

            <button class="button" type="submit">Submit</button>

        </form>
        <button class="button" onClick={handleToggleForm}>
        Already have an account?
        </button>
        </div>
    )
    
}

export default SignUpForm