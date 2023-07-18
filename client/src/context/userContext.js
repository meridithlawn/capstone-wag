import { useReducer, useEffect, useState, createContext} from 'react'
import { useHistory} from 'react-router-dom'
import reactRouterDom from 'react-router-dom'

const UserContext = createContext()


// const initialState = []

// const reducer = (state, action) => {
//     switch (action.type) {
//         case "fetch":
//             return action.payload

//         case "add" :
//             return [...state, action.payload];
//             // for the patch below, the payload is the updated object. probably need to do these on UserProvider instead for full CRUD on user
//         case "patch":
//             return state.map(user => user.id === action.payload.id ? action.payload : user);
//         case "remove":
//             return state.filter(user => user.id !== action.payload);
//         default:
//             return state;

//     }
// }

const UserProvider = ({children}) => {

    const history = useHistory()
    // const [currentUser, setCurrentUser] = useState(null)
    const [currentUser, setCurrentUser] = useState(false)
    // const [state, dispatch] = useReducer(reducer, initialState)
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
                .then((error) => setErrors(error.message))
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
                alert("Incorrect username or password")
        }
        })
    }
// IS IT NECESSARY TO ADD CURLY BRACES AROUND CURRENTUSER IN THE LINE BELOW?
    const handleEditProfile = (values, setErrors) => {
        const {first_name, last_name, email, phone, username, password, breed, age, weight, fixed, profile_pic, bio} = values
            const fixedToBool = fixed.trim() === "yes" ? true : false

            fetch(`/api/v1//users/${currentUser.id}`, {
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json",   
                },
                body: JSON.stringify({handler: {first_name, last_name, email, phone}, user: {username, password, breed, age, weight, fixed: fixedToBool, profile_pic, bio}}),
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
                    .then((error) => setErrors(error.message))
                        // or use setErrors state to update error message
                }
            })
                .catch((error) => console.log(error));
            
    }
    
    const handleSignOutClick= () => {
        fetch("/api/v1/signout", {method: "DELETE"})
        
        .then((resp) => {
            if (resp.ok){
            setCurrentUser(null); 
            }
        
        });
    }

    // const handleLikeClick = (e) => {
    //     fetch("/api/v1/interactions", {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",   
    //         },
    //         body: JSON.stringify(values, null, 2),
    //     }).then(resp => {
    //         console.log("RESP", resp)
    //         if (resp.ok) {
    //             resp.json()
    //             .then(data => {
    //                 // saveUser(data)
    //             })
    //         }
    //         else {
    //             resp.json()
    //             .then(errorObj => {
    //                 alert(errorObj.error)
    //             })
    //         }
    //     })
    // }
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
        .catch(error => console.error(error))
    }



    return (
        <UserContext.Provider value={{handleSignOutClick, handleSignUp, currentUser, saveUser, handleSignInClick, handleEditProfile, handleDelete}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}

// all CRUD and fetch go here, plus  currentUser