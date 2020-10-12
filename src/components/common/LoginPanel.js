
import React, { useContext } from 'react'
import { Hidden, Paper, Box, Typography } from '@material-ui/core'
import GoogleButton from 'react-google-button'
import UserUtil from '../util/UserUtil'
import MessageUtil from '../util/MessageUtil'
import { userContext } from '../context/UserContext'
import { StandardPadding } from '../Configs'

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

    return (
        <Paper variant="outlined">
            <Box px={0} py={StandardPadding.PY} justifyContent="center">
                <Typography variant="body1">
                    {props.title}
                </Typography>
                <Box px={0} py={StandardPadding.PY}>
                    <GoogleButton type="dark" onClick={login}/>
                </Box>
            </Box>
        </Paper>
    )
}

export default LoginPanel