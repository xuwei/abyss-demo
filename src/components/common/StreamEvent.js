import React from 'react'
import { IconButton, Avatar, Box, Typography } from '@material-ui/core'
import { BorderStyle, row, column } from '../style/CommonStyle'
import { StandardPadding } from '../Configs'
import Clap from './Clap'

function StreamEvent(props) {

    const model = props.model

    return (
        <Box {...column} borderBottom={BorderStyle} px={StandardPadding.PX}>
            <Box p={1} pt={StandardPadding.PX} {...row}>
                <Box flexGrow={1} align="left">
                    <Avatar alt={model.displayName} src={model.avatarUrl}/>
                </Box>
                <Box>
                    <Typography variant="body1">{model.timeAgo}</Typography>
                </Box>
            </Box>
            <Box p={1} pt={StandardPadding.PX} {...row}>
                <Box flexGrow={1} align="left">
                    <Typography align="left" color="primary" variant="h4">{model.descriptions}</Typography>
                </Box>
            </Box>
            <Box {...row} justifyContent="flex-end">
                <Box p={1}  my="auto">
                    <IconButton size="small" onClick={props.startEdit}><Clap /></IconButton>
                </Box>
                <Box p={1} my="auto">
                    <Typography style={{ verticalAlign: "baseline"}} align="left" variant="body2">{model.claps}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default StreamEvent