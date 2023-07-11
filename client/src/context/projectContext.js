import { useReducer, useHistory, createContext} from 'react'

const ProjectContext = createContext()

const initialState = []

const reducer = (state, action) => {
    switch (action.type) {
        case "fetch":
            return action.payload

        case "add" :
            return [...state, action.payload];
            // for the patch below, the payload is the updated object. probably need to do these on UserProvider instead for full CRUD on user
        case "patch":
            return state.map(project => project.id === action.payload.id ? action.payload : project);
        case "remove":
            return state.filter(project => project.id !== action.payload);
        default:
            return state;

    }
}

const ProjectProvider = ({children}) => {

    // const [currentUser, setCurrentUser] = useState(null)
    const [state, dispatch] = useReducer(reducer, initialState)

    const handleFetchTraditional = () => {
    fetch('/api/v1/users')
    .then(response => {
        response.json().then(data => {
            if(response.status === 200){
                dispatch({
                    type: 'fetch',
                    payload: data
                })
            }else{
                throw new Error("Could not completel the request. Check request")  
            }
        })
    })
    .catch(error => alert(error)) 
    }

    // const history = useHistory()

    // const handleSignoutClick= () => {
    //     fetch("/api/v1/signout", {method: "DELETE"})
    //         .then(res => {
    //         if(res.ok) {
    //             setCurrentUser(null);
    //           // history.push('/authentication') the ix version
    //           // following line goes to authentication route, check where I want to redirect to
    //             history.push('/authentication')
    //         } 
    //         })
    //     }



    return (
        <ProjectContext.Provider value={{state, dispatch}}>
            {children}
        </ProjectContext.Provider>
    )
}

export {ProjectContext, ProjectProvider}

// all CRUD and fetch go here, plus  currentUser