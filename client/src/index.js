
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'; 
import { UserProvider } from './context/userContext';
import { ErrorProvider } from "./context/errorContext";
// import "./index.css";

ReactDOM.render(
    <Router>
    <ErrorProvider>
        <UserProvider>
            {/* <Router> */}
                <App />
            {/* </Router> */}
        </UserProvider>
    </ErrorProvider>
    </Router>
    ,document.getElementById('root')

);