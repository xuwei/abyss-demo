
import React, { useContext } from 'react'
import { Button, Paper, Box, Typography } from '@material-ui/core'
import GoogleButton from 'react-google-button'
import UserUtil from '../util/UserUtil'
import MessageUtil from '../util/MessageUtil'
import { userContext } from '../context/UserContext'
import { StandardPadding } from '../Configs'
import EditIcon from '@material-ui/icons/Edit';

function LoginPanel(props) {

    const userManager = useContext(userContext)
    const login = () => {
        UserUtil.login().then((loggedInUser) => {
            // use context obj's callback method to update user 
            userManager.updateUser(loggedInUser)
        }).catch((error) => {
            MessageUtil.messagePopup(error)
        })
    }

    const loginAnonymous = () => {
        UserUtil.loginAnonymously().then((loggedInUser) => {
            debugger;
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
                    <Button variant="contained" size="large" color="primary" onClick={loginAnonymous}><EditIcon/>&nbsp;&nbsp;Login as guest</Button>
                </Box>
                <Box px={0} py={StandardPadding.PY}>
                    <Typography variant="h5">OR</Typography>
                </Box>
                <Box px={0} py={StandardPadding.PY}>
                    <GoogleButton type="dark" onClick={login}/>
                </Box>
            </Box>
        </Paper>
    )
}

export default LoginPanel