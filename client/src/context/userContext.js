import { useContext, useEffect, useState, createContext} from 'react'
import { useHistory} from 'react-router-dom'
import { ErrorContext } from './errorContext'

const UserContext = createContext()


const UserProvider = ({children}) => {

    const history = useHistory()
    
    const {saveErrors} = useContext(ErrorContext)
    const [currentUser, setCurrentUser] = useState(false)
    
    const saveUser = (new_user) => {
        setCurrentUser(new_user)
    }

    useEffect(() => {
        fetch("/api/v1/check-user")
        .then(response => {
            if (response.ok) {
            response.json()
            .then(saveUser)
            }
        })
    }, [])

    const handleSignUp = (values, resetForm, setErrors) => {
        const {first_name, last_name, email, phone, username, password, breed, age, weight, fixed, profile_pic} = values
        const fixedToBool = fixed.trim() === "yes" ? true : false

        fetch("/api/v1/signup", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",   
            },
            body: JSON.stringify({handler: {first_name, last_name, email, phone}, user: {username, password, breed, age, weight, fixed: fixedToBool, profile_pic}}),
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
                .then((error) => saveErrors(error.message))
                    // or use setErrors state to update error message
            }
        })
            .catch((error) => console.log(error));
    }

    
    const handleSignInClick = (values) => {
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
                saveErrors("Incorrect username or password")
        }
        })
    }
// IS IT NECESSARY TO ADD CURLY BRACES AROUND CURRENTUSER IN THE LINE BELOW?
// did i IMPLEMENT ERROR CONTEXT IN THE FETCH HERE correctly?
    const handleEditProfile = (values, saveErrors) => {
        // const {first_name, last_name, email, phone, username, password, breed, age, weight, fixed, profile_pic, bio} = values
        const {username, breed, age, weight, fixed, profile_pic, bio} = values    
        const fixedToBool = fixed.trim() === "yes" ? true : false

            fetch(`/api/v1//users/${currentUser.id}`, {
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json",   
                },
                body: JSON.stringify({username, breed, age, weight, fixed: fixedToBool, profile_pic, bio}),
            })
            .then((resp) => {
                console.log("RESP", resp)
                if (resp.ok) {
                    resp.json()
                    .then(data => {
                        saveUser(data)
                    })
                } else {
                    resp.json()
                    .then((error) => saveErrors(error.message))
                        // or use setErrors state to update error message
                }
            })
                // .catch((error) => console.log(error));
                .catch((error) => saveErrors(error));
            
    }
    
    const handleSignOutClick= () => {
        fetch("/api/v1/signout", {method: "DELETE"})
        
        .then((resp) => {
            if (resp.ok){
            setCurrentUser(null); 
            }
        
        });
    }

    const handleLikeClick = (values) => {
        fetch("/api/v1/interactions", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",   
            },
            body: JSON.stringify(values, null, 2),
        }).then(resp => {
            console.log("RESP", resp)
            if (resp.ok) {
                resp.json()
                .then(data => {
                    // debugger;
                    // saveUser(data)?
                })
            } else {
                resp.json()
                .then(errorObj => {
                    saveErrors(errorObj.error)
                })
            }
        })
    }

    const handleDislikeClick = (values) => {
        fetch("/api/v1/interactions", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null,2),
            }).then(resp => {
            if (resp.ok) {
                resp.json()
                .then(data => {

                })
            } else {
                resp.json()
                .then(errorObj => {
                    saveErrors(errorObj.error)
                })
            }
        })
    }
// DELETE USER WORKS BUT DOESN'T DELETE HANDLER
    const handleDelete = (e) => {
        fetch(`/api/v1/users/${currentUser.id}`,{
          method: 'DELETE'
        })
        .then(res => {
          if (res.ok){
            saveUser(null)
            // history.push("/signin")
          }
          
        })
        .catch(error => saveErrors(error))
    }



    return (
        <UserContext.Provider value={{handleSignOutClick, handleLikeClick, handleDislikeClick, handleSignUp, currentUser, saveUser, handleSignInClick, handleEditProfile, handleDelete}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}

// all CRUD and fetch go here, plus  currentUser