
import React, { useContext } from 'react'
import { useHistory } from "react-router-dom"
import { Paper, Box, Typography } from '@material-ui/core'
import GoogleButton from 'react-google-button'
import FacebookLoginButton from '../common/FacebookLoginButton'
import UserService from '../service/UserService'
import MessageUtil from '../util/MessageUtil'
import { userContext } from '../context/UserContext'
import { StandardPadding, StaticRoutes } from '../Configs'
import { googleProvider } from '../../Firebase'
import { dialogContext } from '../context/DialogContext'
import DialogModel from '../model/DialogModel'


function LinkPanel(props) {

    const history = useHistory()
    const userManager = useContext(userContext)
    const dialogManager = useContext(dialogContext)
    const linkGmail = () => {

        const provider = googleProvider()
        UserService.linkAnonymousToProvider(provider).then((result)=>{
            var loggedInUser = result.user 
            userManager.updateUser(loggedInUser)
            history.push(StaticRoutes.TODO)
        }).catch((error)=> {
            const dialog = new DialogModel("Message", error.message, "Ok")
            dialogManager.updateDialogMsg(dialog)
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