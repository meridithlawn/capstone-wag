
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'; 
import { UserProvider } from './context/userContext';
// import "./index.css";

ReactDOM.render(
    // <ErrorProvider>
        <UserProvider>
            <Router>
                <App />
            </Router>
        </UserProvider>
    // </ErrorProvider>
    ,document.getElementById('root')

);