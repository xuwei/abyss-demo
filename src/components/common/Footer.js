import React from 'react';
import { Link, Box, Typography } from '@material-ui/core';
import { LargePadding, StandardPadding, StaticRoutes } from '../Configs'

function Footer() {
    return (
    <Box>
        {/* <Box mx="auto" flexGrow={1} align="center" pt={LargePadding.PY}>
            <Typography variant="caption" color="textPrimary" mx="auto">
                <Link href={StaticRoutes.CONTACT_EMAIL}>Contact</Link> | <Link href="/terms">Terms and Conditions</Link> | <Link href="/privacy">Privacy</Link>
            </Typography>
        </Box>
        <Box mx="auto" flexGrow={1} align="center" pt={StandardPadding.PY} pb={StandardPadding.PY}> 
        <Typography variant="caption" color="textPrimary" mx="auto">
            &copy;2020 Wisetree Solutions v1.0<br/>
            Made with &hearts; in Sydney
        </Typography>
        </Box>
        <Box mx="auto" flexGrow={1} align="center" pt={0} pb={LargePadding.PY}>
        <Typography variant="caption" color="textPrimary" mx="auto"></Typography>
        </Box> */}
    </Box>
    )
}

export default Footer