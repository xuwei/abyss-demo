import { Hidden, Checkbox, Box, Typography, TextField } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { StateOfTask } from '../model/TaskModel'
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import ArchiveIcon from '@material-ui/icons/Archive'
import UndoIcon from '@material-ui/icons/Undo'
import { IconButton } from '@material-ui/core'
import { BorderStyle } from '../Configs'

function Task(props) {

    const model = props.model
    const [desc, setDesc] = useState(model.descriptions);
    
    const handleTextChange = e => {
        setDesc(e.target.value);
    }

    useEffect(() => {
    }, [])

    const defaultProps = {
        display: "flex",
        flexDirection: "column",
        p: 1,
        m: 0
    }

    switch(model.state) {
        case StateOfTask.Pending:
            return(
                <Box {...defaultProps} borderBottom={BorderStyle}>
                    <Box display="flex" flexDirection="row">
                        <Hidden smDown>
                            <Box p={1}>
                                <Checkbox checked={false} onChange={props.checkEvent} onClick={props.toggleTaskState}/>
                            </Box>
                        </Hidden>
                        <Box p={1}>
                            <Typography  variant="h4" color="primary">{model.descriptions}</Typography>
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" justifyContent="flex-end">
                        <Box p={1}>
                            <IconButton onClick={props.startEdit}><EditIcon fontSize="small"/></IconButton>
                        </Box>
                        <Box p={1}>
                            <IconButton onClick={props.doneTask}><DoneIcon fontSize="small"/></IconButton>
                        </Box>
                        <Box p={1}>
                            <IconButton onClick={props.archiveTask}><ArchiveIcon fontSize="small"/></IconButton>
                        </Box>
                    </Box>
                </Box>
            )
        case StateOfTask.Edit:
            return(
                <Box {...defaultProps} borderBottom={BorderStyle}>
                    <Box display="flex" flexDirection="row">
                        <Hidden smDown>
                            <Box p={1}>
                                <Checkbox disabled checked={false} onChange={props.checkEvent}/>
                            </Box>
                        </Hidden>
                        <Box p={1} width="90%">
                            <TextField fullWidth={true} defaultValue={model.descriptions} onChange={handleTextChange}/>
                        </Box >
                    </Box>
                    <Box display="flex" flexDirection="row" justifyContent="flex-end">
                        <Box p={1}>
                            <IconButton onClick={() => props.endEdit(model.id, desc)}><EditIcon fontSize="small"/></IconButton>
                        </Box>
                        <Box p={1}>
                            <IconButton disabled={true} onClick={props.doneTask}><DoneIcon fontSize="small"/></IconButton>
                        </Box>
                        <Box p={1}>
                            <IconButton disabled={true} onClick={props.archiveTask}><ArchiveIcon fontSize="small"/></IconButton>
                        </Box>
                    </Box>
                </Box>
            )
        case StateOfTask.Done:
            return ( 
                <Box {...defaultProps} borderBottom={BorderStyle}>
                    <Box display="flex" flexDirection="row">
                        <Hidden smDown>
                            <Box p={1}>
                                <Checkbox color="primary" checked={true} onClick={props.toggleTaskState}/>
                            </Box>
                        </Hidden>
                        <Box p={1}>
                            <Typography variant="h4" style={{textDecoration : "line-through"}}>{model.descriptions}</Typography>
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" justifyContent="flex-end">
                        <Box p={1}>
                            <IconButton onClick={props.undoTask}><UndoIcon fontSize="small"/></IconButton>
                        </Box>
                        <Box p={1}>
                            <IconButton onClick={props.archiveTask}><ArchiveIcon fontSize="small"/></IconButton>
                        </Box>
                    </Box>
                </Box>
            )
        default:
            return(<div>invalid state</div>)
    }
}

export default Task