import {useContext, useState} from "react";
import {useFormik} from "formik";
import * as yup from "yup";
import { UserContext } from "../context/userContext";
import { ErrorContext } from "../context/errorContext";


function ReportForm() {



    const {currentUser} = useContext(UserContext)
    const {saveErrors} = useContext(ErrorContext)

    const [reports, setReports] = useState({})
    const userSchema = yup.object({

        receiver_id: yup.string().required("User id of the user in question is required"),
        description: yup.string().required("Please provide details about the incident"),
        
    })
    const formik = useFormik ({
        initialValues: {
            sender_id: currentUser.id,
            receiver_id: "",
            concern: "",
            description: ""
            // incident_datetime: ""
            
        },
        validationSchema: userSchema,
        onSubmit: values => {
            console.log("im in fetch")
            fetch("/api/v1/reports", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",   
                },
                body: JSON.stringify(values, null, 2),
            }).then(resp => {
                console.log("RESP", resp)
                if (resp.ok) {
                    resp.json()
                    .then(data => {
                        setReports(data)
                    })
                }
                else {
                    resp.json()
                    .then(errorObj => {
                        saveErrors(errorObj.error)
                    })
                }
            })
        },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
            <label htmlFor="sender_id">sender_id:</label>
            <input
                id="sender_id"
                name="sender_id"
                type="text"
                placeholder="sender_id"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sender_id} 
            />
            <label htmlFor="receiver_id">receiver_id:</label>
            <input
                id="receiver_id"
                name="receiver_id"
                type="text"
                placeholder="receiver_id"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.receiver_id} 
            />
            <label htmlFor="concern">concern:</label>
            <input
                id="concern"
                name="concern"
                type="text"
                placeholder="concern"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.concern} 
            />
            <label htmlFor="description">description:</label>
            <input
                id="description"
                name="description"
                type="text"
                placeholder="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description} 
            />
            {/* <label htmlFor="incident_datetime">incident_datetime:</label>
            <input
                id="incident_datetime"
                name="incident_datetime"
                type="datetime"
                placeholder="date time"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.incident_datetime} 
            /> */}
            <button type="submit">Submit</button>
            </form>
            </div>

    )
    
}

export default ReportForm