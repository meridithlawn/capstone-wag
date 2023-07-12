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
          if (response.ok){
            response.json()
            .then(saveUser)
          }
        })
        }, [])

    // const handleFetchTraditional = () => {
    // fetch('/api/v1/users')
    // .then(response => {
    //     response.json().then(data => {
    //         if(response.status === 200){
    //             dispatch({
    //                 type: 'fetch',
    //                 payload: data
    //             })
    //         }else{
    //             throw new Error("Could not complete the request. Check request")  
    //         }
    //     })
    // })
    // .catch(error => alert(error)) 
    // }

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
    const handleSignOutClick= () => {
        fetch("/api/v1/signout", {method: "DELETE"})
        
        .then((resp) => {
            if (resp.ok){
            setCurrentUser(null); 
            }
          
        });
      }



    return (
        <UserContext.Provider value={{handleSignOutClick, handleSignUp, currentUser, saveUser, handleSignInClick}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}

// all CRUD and fetch go here, plus  currentUser