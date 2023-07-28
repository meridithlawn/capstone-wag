
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'; 
import { UserProvider } from './context/userContext';
import { ErrorProvider } from "./context/errorContext";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/lato';
import "./index.css";

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