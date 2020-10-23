import { Hidden, Checkbox, Box, Typography, TextField } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { StateOfTask } from '../model/TaskModel'
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import ArchiveIcon from '@material-ui/icons/Archive'
import UndoIcon from '@material-ui/icons/Undo'
import { IconButton } from '@material-ui/core'
import { BorderStyle, DefaultIconFontSize } from '../Configs'

function Task(props) {

    const model = props.model
    const [desc, setDesc] = useState(model.descriptions);
    
    const handleTextChange = e => {
        setDesc(e.target.value);
    }

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
                <Box {...column} borderBottom={BorderStyle}>
                    <Box {...row}>
                        <Hidden smDown>
                            <Box p={1}>
                                <Checkbox checked={false} onChange={props.checkEvent} onClick={props.toggleTaskState}/>
                            </Box>
                        </Hidden>
                        <Box p={1}>
                            <Typography  variant="h4" color="primary">{model.descriptions}</Typography>
                        </Box>
                    </Box>
                    <Box {...row} justifyContent="flex-end">
                        <Box p={1}>
                            <IconButton onClick={props.startEdit}><EditIcon fontSize={DefaultIconFontSize}/></IconButton>
                        </Box>
                        <Box p={1}>
                            <IconButton onClick={props.doneTask}><DoneIcon fontSize={DefaultIconFontSize}/></IconButton>
                        </Box>
                        <Box p={1}>
                            <IconButton onClick={props.archiveTask}><ArchiveIcon fontSize={DefaultIconFontSize}/></IconButton>
                        </Box>
                    </Box>
                </Box>
            )
        case StateOfTask.Edit:
            return(
                <Box {...column} borderBottom={BorderStyle}>
                    <Box {...row}>
                        <Hidden smDown>
                            <Box p={1}>
                                <Checkbox disabled checked={false} onChange={props.checkEvent}/>
                            </Box>
                        </Hidden>
                        <Box p={1} width="90%">
                            <TextField fullWidth={true} defaultValue={model.descriptions} onChange={handleTextChange}/>
                        </Box >
                    </Box>
                    <Box {...row} justifyContent="flex-end">
                        <Box p={1}>
                            <IconButton onClick={() => props.endEdit(model.id, desc)}><EditIcon fontSize={DefaultIconFontSize}/></IconButton>
                        </Box>
                        <Box p={1}>
                            <IconButton disabled={true} onClick={props.doneTask}><DoneIcon fontSize={DefaultIconFontSize}/></IconButton>
                        </Box>
                        <Box p={1}>
                            <IconButton disabled={true} onClick={props.archiveTask}><ArchiveIcon fontSize={DefaultIconFontSize}/></IconButton>
                        </Box>
                    </Box>
                </Box>
            )
        case StateOfTask.Done:
            return ( 
                <Box {...column} borderBottom={BorderStyle}>
                    <Box {...row}>
                        <Hidden smDown>
                            <Box p={1}>
                                <Checkbox color="primary" checked={true} onClick={props.toggleTaskState}/>
                            </Box>
                        </Hidden>
                        <Box p={1}>
                            <Typography variant="h4" style={{textDecoration : "line-through"}}>{model.descriptions}</Typography>
                        </Box>
                    </Box>
                    <Box {...row} justifyContent="flex-end">
                        <Box p={1}>
                            <IconButton onClick={props.undoTask}><UndoIcon fontSize={DefaultIconFontSize}/></IconButton>
                        </Box>
                        <Box p={1}>
                            <IconButton onClick={props.archiveTask}><ArchiveIcon fontSize={DefaultIconFontSize}/></IconButton>
                        </Box>
                    </Box>
                </Box>
            )
        default:
            return(<div>invalid state</div>)
    }
}

export default Task