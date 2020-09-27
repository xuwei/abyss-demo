import React, { useState, useRef, useEffect } from 'react'
import { Button, TextareaAutosize, Paper, Typography, Box, Container } from '@material-ui/core'
import { LargePadding, StandardPadding, ContentWidth } from '../Configs'
import TaskModel, { StateOfTask } from '../model/TaskModel'
import uuid from 'react-uuid'
import Task from '../common/Task'

function HomePage() {

    const [tasks, setTasks] = useState([])
    const newTaskInput = useRef(null)
    const startEdit = (id) => {
        updateState(id, StateOfTask.Edit)
    }

    const endEdit = (id, descriptions) => {

        var currentList = [...tasks]
        for (var i = 0; i < currentList.length; i++) {
            var task = currentList[i]
            if (task.id === id) {
                task.descriptions = descriptions
                task.state = StateOfTask.Pending
            }
            currentList[i] = task
        }
        setTasks(currentList)
    }

    const doneTask = (id) => {
        updateState(id, StateOfTask.Done)
    }

    const updateState = (id, state) => {
        var currentList = [...tasks]
        for (var i = 0; i < currentList.length; i++) {
            var task = currentList[i]
            if (task.id === id) {
                task.state = state
            }
            currentList[i] = task
        }
        setTasks(currentList)
    }

    const removeTask = (id) => {
        const newList = tasks.filter((task)=> task.id !== id)
        setTasks(newList)
    }

    const addNewTask = (e) => { 
        const newTaskDescriptions = newTaskInput.current.value.trim()
        const taskModel = new TaskModel(uuid(), newTaskDescriptions, StateOfTask.Pending, "", "", new Date())
        const list = tasks.slice()
        list.push(taskModel)
        setTasks(list)
        newTaskInput.current.value = ""
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
                            <Task model={taskModel} 
                                doneTask={()=>{ doneTask(taskModel.id)}} 
                                startEdit={()=>{ startEdit(taskModel.id)}}
                                endEdit={endEdit} 
                                removeTask={()=>{removeTask(taskModel.id)}}
                            />
                         ))}
                    </Box>
                </Paper>
            </Box>
            <Box flexGrow={1} align="center" py={LargePadding.PY} xs={ContentWidth.SM} md={ContentWidth.MD}>
                <TextareaAutosize ref={newTaskInput} rowsMin={3} placeholder="Enter new task" style={{"width": "50%", "textAlign" : "center", "backgroundColor" : "black", "color" : "white"}} />
            </Box>
            <Box flexGrow={1} align="center" pt={StandardPadding.PY} xs={ContentWidth.SM} md={ContentWidth.MD}>
                <Button size="large" variant="contained" color="primary" onClick={addNewTask}>Add task</Button>
            </Box>
        </Container>
    )
}

export default HomePage