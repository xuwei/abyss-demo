import React, { useState, useContext, useEffect } from 'react';
import { LinearProgress, Link, Menu, MenuItem, Box, Button, Typography, Toolbar, AppBar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import UserService, { ProviderType } from '../service/UserService'
import { userContext }  from '../context/UserContext'
import { loadingContext } from '../context/LoadingContext'
import { dialogContext } from '../context/DialogContext'
import { reactLocalStorage } from 'reactjs-localstorage'
import DialogModel from '../model/DialogModel'
import firebase from '../../Firebase.js'
import { auth } from '../../Firebase.js'

function NavBar() {

    const userManager = useContext(userContext)
    const loadingManager = useContext(loadingContext)
    const dialogManager = useContext(dialogContext)

    const [anchorEl, setAnchorEl] = useState(null)
    const [provider, setProvider] = useState(null)

    const handleMenuPopup = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleMenuDismiss = () => {
        setAnchorEl(null)
    }

    const linkAccount = () => {
        if (auth === null) return
        const provider = new firebase.auth.GoogleAuthProvider();
        UserService.linkAccount(provider).then((result)=>{

        }).catch((error)=>{
            const dialog = new DialogModel("Error", error.message, "Ok")
            dialogManager.updateDialogMsg(dialog)
        })
        
    }

    const logout = () => {
        UserService.logout().then(()=> {
            userManager.updateUser(null)
            setProvider(null)
            reactLocalStorage.clear()
        })
    }

    useEffect(()=>{
        if (userManager.user !== null) {
            const provider = UserService.currentProvider()
            setProvider(provider)
        }
    },[userManager.user])

    return (
        <AppBar color="transparent" position="static">
            <Toolbar>
                <Box>
                    <MenuIcon aria-controls="quickMenu" aria-haspopup="true" onClick={handleMenuPopup} />
                    { userManager.user ?
                    <Menu id="quickMenu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuDismiss}>
                        <MenuItem onClick={handleMenuDismiss}>
                            <Link href="/todo" color="textPrimary">
                                Todo
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuDismiss}>
                            <Link href="/archive" color="textPrimary">
                                Archive
                            </Link>
                        </MenuItem>
                    </Menu>
                    :
                    <Menu id="quickMenu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuDismiss}>
                        <MenuItem onClick={handleMenuDismiss}>
                            <Link href="/" color="textPrimary">
                                Home
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuDismiss}>
                            <Link href="/Todo" color="textPrimary">
                                Todo
                            </Link>
                        </MenuItem>
                    </Menu>
                    }
                </Box>
                <Box flexGrow={1} px={2}>
                    <Typography variant="h6">
                        Todo List
                    </Typography>
                </Box>
                { 
                    userManager.user &&
                    <div>
                    {
                        provider !== ProviderType.GUEST ?
                        <Box>
                            <Typography variant="caption">
                                {userManager.user.displayName ? userManager.user.displayName : "Guest"}
                            </Typography>
                            <Button size="small" varianet="contained" onClick={logout}>
                                Sign out
                            </Button>
                        </Box>
                        :
                        <Box>
                            <Button color="primary" size="small" varianet="contained" onClick={linkAccount}>
                                <Typography variant="body1" >Link</Typography>
                            </Button>
                            <Button size="small" varianet="contained" onClick={logout}>
                                Sign out
                            </Button>
                        </Box>
                    }
                    </div>
                }
            </Toolbar>
            { loadingManager.loading ? <LinearProgress/> : <Box/> }
        </AppBar>
    )
}

export default NavBar