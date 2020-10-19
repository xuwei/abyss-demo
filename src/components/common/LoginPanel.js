
import React, { useContext } from 'react'
import { Paper, Box, Typography } from '@material-ui/core'
import GoogleButton from 'react-google-button'
import FacebookLoginButton from '../common/FacebookLoginButton'
import AnonymousLoginButton from '../common/AnonymousLoginButton'
import UserService from '../service/UserService'
import MessageUtil from '../util/MessageUtil'
import { userContext } from '../context/UserContext'
import { StandardPadding } from '../Configs'

function LoginPanel(props) {

    const userManager = useContext(userContext)
    const login = () => {
        UserService.login().then((loggedInUser) => {
            // use context obj's callback method to update user 
            userManager.updateUser(loggedInUser)
        }).catch((error) => {
            MessageUtil.messagePopup(error)
        })
    }

    const loginAnonymously = () => {
        UserService.loginAnonymously().then((loggedInUser) => {
            debugger;
            userManager.updateUser(loggedInUser)
        }).catch((error) => {
            MessageUtil.messagePopup(error)
        })
    }

    const loginFB = () => {
        UserService.loginFb().then((loggedInUser) => {
            // use context obj's callback method to update user 
            userManager.updateUser(loggedInUser)
        }).catch((error) => {
            MessageUtil.messagePopup(error)
        })
    }

    return (
        <Paper variant="outlined">
            <Box px={0} py={StandardPadding.PY} justifyContent="center">
                <Box px={0} py={StandardPadding.PY}>
                <Typography variant="h5">
                    {props.title}
                </Typography>
                </Box>
                <Box px={0} py={StandardPadding.PY}>
                    <AnonymousLoginButton onClick={loginAnonymously}/>
                </Box>
                <Box px={0} py={StandardPadding.PY}>
                    <Typography variant="h5">OR</Typography>
                </Box>
                <Box px={0} py={StandardPadding.PY}>
                    <GoogleButton type="dark" onClick={login}/>
                </Box>
                <Box px={0} py={StandardPadding.PY} hidden={true}>
                    <FacebookLoginButton appId="" onClick={loginFB}/>
                </Box>
            </Box>
        </Paper>
    )
}

export default LoginPanel