import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { LinearProgress, Link, Menu, MenuItem, Box, Typography, Toolbar, AppBar, Avatar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import UserService, { ProviderType } from '../service/UserService'
import { userContext }  from '../context/UserContext'
import { loadingContext } from '../context/LoadingContext'
import { column } from '../style/CommonStyle';

function NavBar() {
    const history = useHistory()
    const userManager = useContext(userContext)
    const loadingManager = useContext(loadingContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const [provider, setProvider] = useState(null)

    const handleMenuPopup = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleMenuDismiss = () => {
        setAnchorEl(null)
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
                            <Link href="/stream" color="textPrimary">
                                Stream
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuDismiss}>
                            <Link href="/archive" color="textPrimary">
                                Archive
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuDismiss}>
                            <Link href="/faq" color="textPrimary">
                                FAQ
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuDismiss}>
                            <Link href="/setting" color="textPrimary">
                                Setting
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
                        <Box {...column}>
                            <Box p={1}>
                                <Avatar alt={userManager.user.displayName} src={userManager.user.photoURL}/>
                            </Box>
                        </Box>
                        :
                        <Box {...column}>
                            <Box p={1}>
                                <Avatar alt="guest" src=""/>
                            </Box>
                        </Box>
                    }
                    </div>
                }
            </Toolbar>
            { loadingManager.loading ? <LinearProgress/> : <LinearProgress variant="determinate" value={0} style={{opacity: 0}}/> }
        </AppBar>
    )
}

export default NavBar