import React, { useState, useContext, useEffect } from 'react';
import { LinearProgress, Link, Menu, MenuItem, Box, Button, Typography, Toolbar, AppBar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import UserService from '../service/UserService'
import { userContext }  from '../context/UserContext'
import { loadingContext } from '../context/LoadingContext'
import { reactLocalStorage } from 'reactjs-localstorage'

function NavBar() {

    const userManager = useContext(userContext)
    const loadingManager = useContext(loadingContext)
    const [anchorEl, setAnchorEl] = useState(null)

    const handleMenuPopup = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleMenuDismiss = () => {
        setAnchorEl(null)
    }

    const logout = () => {
        UserService.logout().then(()=> {
            userManager.updateUser(null)
            reactLocalStorage.clear()
            
        })
    }

    useEffect(()=>{
    },[])

    if (userManager.user !== null) {

    }

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
                    <Box>
                        <Typography variant="caption">
                            {userManager.user.displayName ? userManager.user.displayName : "Guest"}
                        </Typography>
                        <Button size="small" varianet="contained" onClick={logout}>
                            Sign out
                        </Button>
                    </Box>
                }
            </Toolbar>
            { loadingManager.loading ? <LinearProgress/> : <Box/> }
        </AppBar>
    )
}

export default NavBar