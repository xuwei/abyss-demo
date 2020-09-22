import React, { useState } from 'react';
import { Link, Menu, MenuItem, Box, Typography, Toolbar, AppBar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

function NavBar() {

    const [anchorEl, setAnchorEl] = useState(null)

    const handleMenuPopup = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleMenuDismiss = () => {
        setAnchorEl(null)
    }

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
                        Abyss Demo
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar