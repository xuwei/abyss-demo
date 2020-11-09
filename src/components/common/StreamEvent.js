import React from 'react'
import { IconButton, Avatar, Box, Typography } from '@material-ui/core'
import { BorderStyle, row, column } from '../style/CommonStyle'
import { StandardPadding } from '../Configs'

function StreamEvent(props) {

    const model = props.model

    return (
        <Box {...column} borderBottom={BorderStyle}>
            <Box p={1} pt={StandardPadding.PX} {...row}>
                <Box flexGrow={1} align="left">
                    <Avatar alt={model.displayName} src={model.avatarUrl}/>
                </Box>
                <Box>
                    <Typography variant="body1">5mins ago</Typography>
                </Box>
            </Box>
            <Box p={1} pt={StandardPadding.PX} {...row}>
                <Box flexGrow={1} align="left">
                    <Typography align="left" color="primary" variant="h4">{model.descriptions}</Typography>
                </Box>
            </Box>
            <Box {...row} justifyContent="flex-end">
                <Box p={1}>
                    <IconButton size="small" onClick={props.startEdit}><span role="img" aria-label="clap">&#128079;</span>&nbsp;56</IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default StreamEvent