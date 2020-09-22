import { Checkbox, Box, Typography } from '@material-ui/core'
import React from 'react'
import { StateOfTask } from '../model/TaskModel'

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
                </Box>
            )
        case StateOfTask.Edit:
            return(
                <Box display="flex" flexDirection="row" p={1} m={1}>
                    <Box p={1}>
                        <Typography variant="caption">{model.state}</Typography>
                    </Box>
                    <Box p={1}>
                        <Typography variant="h4">{model.descriptions}</Typography>
                    </Box>
                </Box>
            )
        case StateOfTask.Done:
            return ( 
                <Box display="flex" flexDirection="row" p={1} m={1}>
                    <Box p={1}>
                        <Typography variant="caption">{model.state}</Typography>
                    </Box>
                    <Box p={1}>
                        <Typography variant="h4" style={{textDecoration : "line-through"}}>{model.descriptions}</Typography>
                    </Box>
                </Box>
            )
        default:
            return(<div>test</div>)
    }
}

export default Task