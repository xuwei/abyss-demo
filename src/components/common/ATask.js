import { Checkbox, Box, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { StateOfTask } from '../model/TaskModel'
import DeleteIcon from '@material-ui/icons/Delete'
import RestoreIcon from '@material-ui/icons/Restore'
import { IconButton } from '@material-ui/core'
import { DefaultIconFontSize } from '../Configs'

function ATask(props) {
    const model = props.model

    useEffect(() => {
    }, [])
   
    const column = {
        display: "flex",
        flexDirection: "column",
        p: 1,
        m: 0
    }

    const row = {
        display: "flex",
        flexDirection: "row"
    }

    switch(model.state) {
        case StateOfTask.Pending:
            return(
                <Box {...column}>
                    <Box {...row}>
                        <Box p={1}>
                            <Checkbox checked={false} onChange={props.checkEvent}/>
                        </Box>
                        <Box p={1}>
                            <Typography  variant="h4" color="primary">{model.descriptions}</Typography>
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
                            <Checkbox color="primary" checked={true}/>
                        </Box>
                        <Box p={1}>
                            <Typography variant="h4" style={{textDecoration : "line-through"}}>{model.descriptions}</Typography>
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