import { Box, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'

function TaskArchive(props) {

    const model = props.model

    useEffect(() => {
    }, [])
   
    
    return(
        <Box>
            <Typography color="primary" variant="h6">{model.dateString}</Typography>
        </Box>
    )
}

export default TaskArchive