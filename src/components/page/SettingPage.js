import React, { useContext } from 'react'
import { useHistory } from "react-router-dom";
import { userContext } from '../context/UserContext'
import { dialogContext } from '../context/DialogContext'
import { Avatar, Button, Container, Box, Typography } from '@material-ui/core'
import { LargePadding, StaticRoutes } from '../Configs'
import UserService from '../service/UserService'
import { reactLocalStorage } from 'reactjs-localstorage';
import DialogModel from '../model/DialogModel'

function SettingPage() {

    const history = useHistory()
    const userManager = useContext(userContext)
    const dialogManager = useContext(dialogContext)

    const logout = () => {

        const dialog = new DialogModel("Message", "Logging out?", "Ok", "Cancel")
        dialog.callback = ()=> { 
            UserService.logout().then(()=> {
                userManager.updateUser(null)
                reactLocalStorage.clear()
            }).finally(()=>{
                history.push(StaticRoutes.HOME)
            })
        }
        dialogManager.updateDialogMsg(dialog)
    }

    return (
        <Container>
            <Box flexGrow={1} align="center" py={LargePadding.PY}>
                <Avatar alt={userManager.user.displayName} src={userManager.user.photoURL}/>
                <Typography variant="caption">{userManager.user.displayName}</Typography>
            </Box>
            <Box flexGrow={1} align="center" py={LargePadding.PY}>
                <Button size="small" varianet="contained" onClick={logout}>
                    Sign out
                </Button>
            </Box>
        </Container>
    )
}

export default SettingPage