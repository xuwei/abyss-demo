
import React, { useContext } from 'react'
import { Paper, Box, Typography } from '@material-ui/core'
import GoogleButton from 'react-google-button'
import FacebookLoginButton from '../common/FacebookLoginButton'
import UserService from '../service/UserService'
import MessageUtil from '../util/MessageUtil'
import { userContext } from '../context/UserContext'
import { StandardPadding } from '../Configs'

function LinkPanel(props) {

    const userManager = useContext(userContext)
    const linkGmail = () => {
        UserService.loginGmail().then((loggedInUser) => {
            // use context obj's callback method to update user 
            userManager.updateUser(loggedInUser)
        }).catch((error) => {
            MessageUtil.messagePopup(error)
        })
    }

    const linkFB = () => { console.log("to be implemented...") }

    return (
        <Paper variant="outlined">
            <Box px={0} py={StandardPadding.PY} justifyContent="center">
                <Box px={0} py={StandardPadding.PY}>
                <Typography variant="h5">
                    {props.title}
                </Typography>
                </Box>
                <Box px={0} py={StandardPadding.PY}>
                    <GoogleButton type="dark" onClick={linkGmail}/>
                </Box>
                <Box px={0} py={StandardPadding.PY} hidden={true}>
                    <FacebookLoginButton appId="" onClick={linkFB}/>
                </Box>
            </Box>
        </Paper>
    )
}

export default LinkPanel