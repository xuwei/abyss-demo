import { Checkbox, Box, Typography, TextField } from '@material-ui/core'
import React from 'react'
import { StateOfTask } from '../model/TaskModel'
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

function Task(props) {
    const model = props.model
    switch(model.state) {
        case StateOfTask.Pending:
            return(
                <Box display="flex" flexDirection="row" p={1} m={1}>
                    <Box p={1}>
                        <Checkbox checked={false} onChange={props.checkEvent}/>
                    </Box>
                    <Box p={1}>
                        <Typography variant="h4" color="primary">{model.descriptions}</Typography>
                    </Box>
                    <Box p={1}>
                        <IconButton onClick={props.toggleEdit}><EditIcon/></IconButton>
                    </Box>
                    <Box p={1}>
                        <IconButton onClick={props.doneTask}><DoneIcon/></IconButton>
                    </Box>
                    <Box p={1}>
                        <IconButton onClick={props.removeTask}><DeleteIcon/></IconButton>
                    </Box>
                </Box>
            )
        case StateOfTask.Edit:
            return(
                <Box display="flex" flexDirection="row" p={1} m={1}>
                    <Box p={1}>
                        <Checkbox checked={false} onChange={props.checkEvent}/>
                    </Box>
                    <Box p={1}>
                        <Typography variant="h4" color="primary">{model.descriptions}</Typography>
                    </Box>
                    <Box p={1}>
                        <IconButton onClick={props.toggleEdit}><EditIcon/></IconButton>
                    </Box>
                    <Box p={1}>
                        <IconButton disabled={true} onClick={props.doneTask}><DoneIcon/></IconButton>
                    </Box>
                    <Box p={1}>
                        <IconButton disabled={true} onClick={props.removeTask}><DeleteIcon/></IconButton>
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
                        <IconButton onClick={props.removeTask}><DeleteIcon/></IconButton>
                    </Box>
                </Box>
            )
        default:
            return(<div>test</div>)
    }
}

export default Task