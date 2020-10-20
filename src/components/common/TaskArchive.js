import React, { useState, useEffect } from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography } from '@material-ui/core'
import ATask from '../common/ATask'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import uuid from 'react-uuid'

function TaskArchive(props) {

    const model = props.model
    const [updated, setUpdated] = useState(false)


    const toggleExpanded = (e)=> {
        e.target.parentElement.expanded = !e.target.parentElement.expanded
        setUpdated(!updated)
    }   

    useEffect(() => {
        console.log("toggled")
    }, [setUpdated])

    const deleteTask = (dateString, taskId) => {
        props.deleteTask(dateString, taskId)
    }

    const restoreTask = (dateString, taskId) => {
        props.restoreTask(dateString, taskId)
    }
   
    
    return(
        <Box>
             <Accordion square onClick={toggleExpanded}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id={uuid()}>
                    <Typography color="primary" variant="h6">{model.dateString}&nbsp;{model.tasks.length > 0 && ("(" + model.tasks.length + ")" )}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box>
                    { model.tasks.map((taskModel)=>(
                        <ATask key={taskModel.id} model={taskModel} deleteTask={()=>{ deleteTask(model.dateString, taskModel.id)}} restoreTask={()=>{ restoreTask(model.dateString, taskModel.id)}}/>
                    ))}
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default TaskArchive