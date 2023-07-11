import {useContext, useState, useReducer, createContext} from 'react'

const ProjectContext = createContext()

const ProjectProvider = ({children} => {
    return (
        <ProjectContext.Provider>
            {children}
        </ProjectContext.Provider>
    )
})