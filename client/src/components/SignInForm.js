
import React from "react"
import {useFormik} from "formik";
import * as yup from "yup";

function SignInForm({saveUser, handleToggleForm}) {
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },

        validationSchema: yup.object({
            username: yup.string().required("Username is required"),
            password: yup.string().required("Password is required"),
        }),
        onSubmit: values => {
            fetch("/api/v1/signin",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then(resp => {
            if (resp.ok) {
                resp.json()
                .then(user => {
                    saveUser(user)  
                })
            } else {
                resp.json()
                .then(error => {
                    alert("Incorrect username or password",error.error)
                })
            }
            })
        },
    });
    return (
    <>
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Username:</label>
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
            
            <button type="submit">Login</button>
        
        </form>
            <button onClick={handleToggleForm}>
                Create new account
            </button>
    </>
    )
}
    

        

export default SignInForm;