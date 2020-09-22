import React, { useState, useRef, useEffect } from 'react'
import { Button, TextareaAutosize, Paper, Typography, Box, Container } from '@material-ui/core'
import { LargePadding, StandardPadding, ContentWidth } from '../Configs'
import TaskModel, { StateOfTask } from '../model/TaskModel'
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import uuid from 'react-uuid'
import Task from '../common/Task'

function HomePage() {

    const [tasks, setTasks] = useState([])
    const newTaskInput = useRef(null)

    const checkEvent = (id) => {
        // handle check box event 
    }

    const addNewTask = (e) => { 
        const newTaskDescriptions = newTaskInput.current.value.trim()
        const taskModel = new TaskModel(uuid(), newTaskDescriptions, StateOfTask.Pending, "", "", new Date())
        const list = tasks.slice()
        list.push(taskModel)
        setTasks(list)
        debugger;
    }

    // this triggers refresh when shapes is updated
    useEffect(() => {
    }, [])

    return (
        <Container>
            <Box flexGrow={1} align="center" py={LargePadding.PY}>
                <Typography variant="h2" color="primary" mx="auto" >
                    Abyss TodoList
                </Typography>
            </Box>
            <Box flexGrow={1} align="center" py={LargePadding.PY}>
                <Paper>
                    <Box flexGrow={1} align="center" py={LargePadding.PY} xs={ContentWidth.SM} md={ContentWidth.MD}>
                         {tasks.map((taskModel) => (
                            <Task model={taskModel}/>
                         ))}
                    </Box>
                </Paper>
            </Box>
            <Box flexGrow={1} align="center" py={LargePadding.PY} xs={ContentWidth.SM} md={ContentWidth.MD}>
                <TextareaAutosize ref={newTaskInput} aria-label="minimum height" rowsMin={3} placeholder="Enter new task" style={{"width": "50%", "textAlign" : "center", "backgroundColor" : "black", "color" : "white"}} />
            </Box>
            <Box flexGrow={1} align="center" pt={StandardPadding.PY} xs={ContentWidth.SM} md={ContentWidth.MD}>
                <Button variant="contained" color="primary" onClick={addNewTask}>Add task</Button>
            </Box>
        </Container>
    )
}

export default HomePage