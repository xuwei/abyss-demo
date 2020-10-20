import { Checkbox, Box, Typography, TextField } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { StateOfTask } from '../model/TaskModel'
import DeleteIcon from '@material-ui/icons/Delete'
import RestoreIcon from '@material-ui/icons/Restore'
import { IconButton } from '@material-ui/core'

function ATask(props) {
    const model = props.model

    useEffect(() => {
    }, [])
   
    switch(model.state) {
        case StateOfTask.Pending:
            return(
                <Box display="flex" flexDirection="row" p={1} m={1}>
                    <Box p={1}>
                        <Checkbox checked={false} onChange={props.checkEvent}/>
                    </Box>
                    <Box p={1}>
                        <Typography  variant="h4" color="primary">{model.descriptions}</Typography>
                    </Box>
                    <Box p={1}>
                        <IconButton onClick={props.restoreTask}><RestoreIcon/></IconButton>
                    </Box>
                    <Box p={1}>
                        <IconButton onClick={props.deleteTask}><DeleteIcon/></IconButton>
                    </Box>
                </Box>
            )
        case StateOfTask.Done:
            return ( 
                <Box display="flex" flexDirection="row" p={1} m={1}>
                    <Box p={1}>
                        <Checkbox color="primary" checked={true}/>
                    </Box>
                    <Box p={1}>
                        <Typography variant="h4" style={{textDecoration : "line-through"}}>{model.descriptions}</Typography>
                    </Box>
                    <Box p={1}>
                        <IconButton onClick={props.restoreTask}><RestoreIcon/></IconButton>
                    </Box>
                    <Box p={1}>
                        <IconButton onClick={props.deletTask}><DeleteIcon/></IconButton>
                    </Box>
                </Box>
            )
        default:
            return(<div>invalid state</div>)
    }
}

export default ATask 