import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom"
import { userContext } from '../context/UserContext'
import { dialogContext } from '../context/DialogContext'
import { loadingContext } from '../context/LoadingContext'
import { Button, Container, Box } from '@material-ui/core'
import { LargePadding, StaticRoutes } from '../Configs'
import UserService from '../service/UserService'
import { reactLocalStorage } from 'reactjs-localstorage';

function SettingPage() {

    const history = useHistory()
    const [notFound, setNotFound] = useState(false)
    const userManager = useContext(userContext)

    const logout = () => {
        UserService.logout().then(()=> {
            userManager.updateUser(null)
            reactLocalStorage.clear()
        }).finally(()=>{
            history.push(StaticRoutes.HOME)
        })
    }

    if (notFound) return (<Redirect to={StaticRoutes.NOT_FOUND}/>)
    return (
        <Container>
            <Box flexGrow={1} align="center" py={LargePadding.PY}>
                <Button size="small" varianet="contained" onClick={logout}>
                    Sign out
                </Button>
            </Box>
        </Container>
    )
}

export default SettingPage