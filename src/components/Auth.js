import React, { useState, useEffect } from "react";
import UserService from './service/UserService'
import MessageUtil from './util/MessageUtil'
import { userContext } from './context/UserContext'

function Auth(props) {

    const [user, setUser] = useState(null)

    const update = (loggedInUser) => {
        setUser(loggedInUser)
    }
   
    useEffect(()=> {
        UserService.fetchUser().then((loggedInUser) => {
            setUser(loggedInUser)
        }).catch((error)=> {
            MessageUtil.messagePopup(error)
        })
    }, [])

    return(
        <userContext.Provider value={{user : user, updateUser : update}}>
            {props.children}
        </userContext.Provider>
    )
    
}

export default Auth