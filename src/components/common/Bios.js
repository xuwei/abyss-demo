import React from 'react'
import { Paper, Box, Typography } from '@material-ui/core'
import { StandardPadding } from '../Configs'

function Bios(props) {

    return (
        <Paper>
            <Box py={StandardPadding.PY} px={StandardPadding.PX}>
            <Typography align="center" variant="h4" color="primary" mx="auto" >
                Bios
            </Typography>
            <Typography align="center" variant="h6" color="textPrimary" mx="auto" >
                {props.description}
            </Typography>
            </Box>
        </Paper>
    )
}

export default Bios