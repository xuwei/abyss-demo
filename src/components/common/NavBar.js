import React, { useState, useContext, useEffect } from 'react';
import { Link, Menu, MenuItem, Box, Button, Typography, Toolbar, AppBar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import UserUtil from '../util/UserUtil'
import MessageUtil from '../util/MessageUtil'
import { userContext }  from '../context/UserContext'
import { reactLocalStorage } from 'reactjs-localstorage';

function NavBar() {

    const userManager = useContext(userContext)
    const [anchorEl, setAnchorEl] = useState(null)

    const handleMenuPopup = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleMenuDismiss = () => {
        setAnchorEl(null)
    }

    const login = () => {
        UserUtil.login().then((loggedInUser)=>{
            userManager.updateUser(loggedInUser)
        }).catch((error)=> {
            MessageUtil.messagePopup(error)
        })
    }

    const logout = () => {
        UserUtil.logout().then(()=> {
            userManager.updateUser(null)
            reactLocalStorage.clear()
            
        })
    }

    useEffect(()=>{
    },[])

    return (
        <AppBar color="transparent" position="static">
            <Toolbar>
                <Box>
                    <MenuIcon aria-controls="quickMenu" aria-haspopup="true" onClick={handleMenuPopup} />
                    <Menu id="quickMenu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuDismiss}>
                        <MenuItem onClick={handleMenuDismiss}>
                            <Link href="/" color="textPrimary">
                                Home
                            </Link>
                        </MenuItem>
                    </Menu>
                </Box>
                <Box flexGrow={1} px={2}>
                    <Typography variant="h6">
                        Abyss Todo
                    </Typography>
                </Box>
                { 
                    userManager.user ?
                        <Box>
                            <Typography variant="caption">
                                {userManager.user.displayName}
                            </Typography>
                            <Button varianet="contained" onClick={logout}>
                                Sign out
                            </Button>
                        </Box>
                        :
                        <Box alignItems="right">
                            <Button varianet="contained" onClick={login}>
                                Sign in
                            </Button>
                        </Box>
                }
            </Toolbar>
        </AppBar>
    )
}

export default NavBar