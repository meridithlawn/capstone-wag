
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'; 
import { ProjectProvider } from './context/projectContext';
// import "./index.css";
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    // <UserProvider>
        <ProjectProvider>
            <Router>
                <App />
            </Router>
        </ProjectProvider>
    // </UserProvider>

);