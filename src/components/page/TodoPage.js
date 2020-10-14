import React, { useContext, useState, useRef, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import { userContext } from '../context/UserContext'
import { dialogContext } from '../context/DialogContext'
import { loadingContext } from '../context/LoadingContext'
import { Button, TextareaAutosize, Paper, Typography, Box, Container } from '@material-ui/core'
import LoginPanel from '../common/LoginPanel'
import { StaticRoutes, LargePadding, StandardPadding, ContentWidth } from '../Configs'
import TaskModel, { StateOfTask } from '../model/TaskModel'
import DialogModel from '../model/DialogModel'
import uuid from 'react-uuid'
import Task from '../common/Task'
import TaskUtil from '../util/TaskUtil'

// todo page
function TodoPage() {
    
    const [notFound, setNotFound] = useState(false)
    const [loading, setLoading] = useState(false)
    const [tasks, setTasks] = useState([])
 
    const loadingManager = useContext(loadingContext)
    const userManager = useContext(userContext)
    const dialogManager = useContext(dialogContext)

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

    const undoTask = (id) => {
        updateState(id, StateOfTask.Pending)
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

    const addNewTask = (e) => { 
        const newTaskDescriptions = newTaskInput.current.value.trim()
        const validationErrorMsg = validateEntry(newTaskDescriptions)
        if (validationErrorMsg.length !== 0) { 
            const dialog = new DialogModel("Message", validationErrorMsg, "Ok")
            dialog.callback = ()=> { console.log("") }
            dialogManager.updateDialogMsg(dialog)
            return
         }
        const taskModel = new TaskModel(uuid(), newTaskDescriptions, StateOfTask.Pending, "", "", new Date())
        const list = tasks.slice()
        list.push(taskModel)
        setTasks(list)
        newTaskInput.current.value = ""
    }
    const validateEntry = (descriptions) => {
        if (descriptions.length === 0) { return "Empty entry is not allowed." }
        if(/^[a-zA-Z0-9- ,_.://@]*$/.test(descriptions) === false) { return "Only basic alphabets, numbers and basic punctuation characters are allowed." }
        return ""
    }

    const storeTasks = () => {
        const user = userManager.user
        const tasksToStore = tasks
        setLoading(true)
        TaskUtil.saveUserTasks(user.uid, tasksToStore).then(()=> {
            const dialog = new DialogModel("Message", "Successfully Saved !", "Ok")
            dialog.callback = ()=> { console.log("") }
            dialogManager.updateDialogMsg(dialog)
        }).catch((error)=> {
            const dialog = new DialogModel("Message", "An error has occurred. Please try again later.", "Ok")
            dialog.callback = ()=> { console.log("") }
            dialogManager.updateDialogMsg(dialog)
        }).finally(()=>{
            setLoading(false)
        })
    }

    const archiveTask = (id) => {
        
        const user = userManager.user
        const taskToArchive = tasks.find((task) => task.id === id)
        setLoading(true)
        const newList = tasks.filter((task)=> task.id !== id)
        TaskUtil.saveUserTasks(user.uid, newList).then(()=>{
            setTasks(newList)
            return TaskUtil.archiveUserTask(user.uid, taskToArchive)
        }).catch((error)=> {
            const dialog = new DialogModel("Message", "An error has occurred. Please try again later.", "Ok")
            dialog.callback = ()=> { console.log("") }
            dialogManager.updateDialogMsg(dialog)
        }).finally(()=>{
            setLoading(false)
        })        
    }


    useEffect(() => {
        const fetchData = () => {
            if (userManager.user === null) return
            
            setLoading(true)
            TaskUtil.getUserTasks(userManager.user.uid).then((result) => {
                setTasks(result)
            }).catch((error) => {
                // redirect to error page
                console.log(error)
                setNotFound(true)
            }).finally(()=>{
                setLoading(false)
            })
        }
        fetchData()
    }, [userManager, setLoading, setNotFound])

    // this triggers refresh when shapes is updated
    useEffect(() => {
        const save = () => {
            if (userManager.user === null) return
            if (tasks.length === 0) return

            setLoading(true)
            TaskUtil.saveUserTasks(userManager.user.uid, tasks).then(() => {
                setLoading(false)
            }).catch((error)=> {
                setLoading(false)
            })
        }
        save()
    }, [tasks, userManager.user])

    useEffect(() => {
        loadingManager.updateLoadingIndicator(loading)
    }, [loading, loadingManager])

    const textAreaStyle = {
        "width": "100%",
        "textAlign" : "center",
        "backgroundColor" : "black",
        "color" : "white",
        "wrap" : "hard"
    }

    if (notFound) return (<Redirect to={StaticRoutes.NOT_FOUND}/>)
    return (
        <Container>
            <Box flexGrow={1} align="center" py={StandardPadding.PY}>
            <userContext.Consumer>
            {(userManager) => (
             userManager.user ?
             <Box>
                <Box flexGrow={1} align="center" py={LargePadding.PY}>
                    <Typography variant="h2" color="primary" mx="auto" >
                        My Todo List
                    </Typography>
                </Box>
                <Box flexGrow={1} align="center" py={LargePadding.PY}>
                    <Paper xs={ContentWidth.SM} md={ContentWidth.MD}>
                        {tasks.map((taskModel) => (
                            <Task key={taskModel.id} model={taskModel} 
                                doneTask={()=>{ doneTask(taskModel.id)}}
                                undoTask={()=>{ undoTask(taskModel.id)}}
                                startEdit={()=>{ startEdit(taskModel.id)}}
                                endEdit={endEdit} 
                                archiveTask={()=>{archiveTask(taskModel.id)}}
                            />
                        ))}
                    </Paper>
                </Box>
                <Box flexGrow={1} align="center" py={LargePadding.PY} xs={ContentWidth.SM} md={ContentWidth.MD}>
                    <TextareaAutosize ref={newTaskInput} rowsMin={3} placeholder="Enter new task" style={textAreaStyle} />
                </Box>
                <Box flexGrow={1} align="center" pt={StandardPadding.PY} xs={ContentWidth.SM} md={ContentWidth.MD}>
                    <Button size="large" variant="contained" color="primary" onClick={addNewTask}>Add task</Button>
                </Box>
                <Box flexGrow={1} align="center" pt={StandardPadding.PY} xs={ContentWidth.SM} md={ContentWidth.MD}>
                    <Button size="large" variant="outlined" color="primary" onClick={storeTasks}>Save</Button>
                </Box>
            </Box>
            :
            <Box>
                <LoginPanel title={"Please sign in to start accessing your Todo Cloud"} />
            </Box>
            )}
            </userContext.Consumer>
            </Box>  
        </Container>
    )
}

export default TodoPage