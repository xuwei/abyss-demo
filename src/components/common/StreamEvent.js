import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { row } from '../style/CommonStyle'

function StreamEvent(props) {

    const model = props.model

    return (
        <Box {...row}>
            <img src={model.avatarUrl}/><br/>
            <Typography variant="body1">{model.displayName}</Typography>
            <Typography variant="h4">{model.descriptions}</Typography>
        </Box>
    )
}

export default StreamEvent