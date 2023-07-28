
import {useContext} from "react"
import {useFormik} from "formik";
import * as yup from "yup";
import { UserContext } from "../context/userContext";
// import {ErrorContext } from "../context/errorContext"

function SignInForm({handleToggleForm}) {
    const {handleSignInClick} = useContext(UserContext)
    // const {saveErrors} = useContext(ErrorContext)

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
            handleSignInClick(values)
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
                placeholder="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
            />
            
            <label htmlFor="password">Password:</label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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

