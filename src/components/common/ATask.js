import { Box, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { StateOfTask } from '../model/TaskModel'
import DeleteIcon from '@material-ui/icons/Delete'
import RestoreIcon from '@material-ui/icons/Restore'
import { IconButton } from '@material-ui/core'
import { DefaultIconFontSize, row, column } from '../style/CommonStyle'

function ATask(props) {
    const model = props.model

    useEffect(() => {
    }, [])

    switch(model.state) {
        case StateOfTask.Pending:
            return(
                <Box {...column}>
                    <Box {...row}>
                        <Box p={1}>
                            <Typography  align="left" variant="h4" color="primary">{model.descriptions}</Typography>
                        </Box>
                    </Box>
                    <Box {...row} justifyContent="flex-end">
                        <Box p={1}>
                            <IconButton onClick={props.restoreTask}><RestoreIcon fontSize={DefaultIconFontSize}/></IconButton>
                        </Box>
                        <Box p={1}>
                            <IconButton onClick={props.deleteTask}><DeleteIcon fontSize={DefaultIconFontSize}/></IconButton>
                        </Box>
                    </Box>
                </Box>
            )
        case StateOfTask.Done:
            return ( 
                <Box {...column}>
                    <Box {...row}>
                        <Box p={1}>
                            <Typography align="left" variant="h4" style={{textDecoration : "line-through"}}>{model.descriptions}</Typography>
                        </Box>
                    </Box>
                    <Box {...row} justifyContent="flex-end">
                        <Box p={1}>
                            <IconButton onClick={props.restoreTask}><RestoreIcon fontSize={DefaultIconFontSize}/></IconButton>
                        </Box>
                        <Box p={1}>
                            <IconButton onClick={props.deleteTask}><DeleteIcon fontSize={DefaultIconFontSize}/></IconButton>
                        </Box>
                    </Box>
                </Box>
            )
        default:
            return(<div>invalid state</div>)
    }
}

export default ATask 