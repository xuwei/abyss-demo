import React, { useContext, useState, useRef, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import { userContext } from '../context/UserContext'
import { dialogContext } from '../context/DialogContext'
import { loadingContext } from '../context/LoadingContext'
import { Button, Paper, Typography, Box, Container } from '@material-ui/core'
import LoginPanel from '../common/LoginPanel'
import { StaticRoutes, LargePadding, StandardPadding, ContentWidth } from '../Configs'
import TaskModel, { StateOfTask } from '../model/TaskModel'
import DialogModel from '../model/DialogModel'
import uuid from 'react-uuid'
import Task from '../common/Task'
import TaskService from '../service/TaskService'
import WiseQuotesService from '../service/WiseQuotesService'
import TextInputArea from '../common/TextInputArea'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

// todo page
function TodoPage() {
    
    const [quote, setQuote] = useState(null)
    const [notFound, setNotFound] = useState(false)
    const [loading, setLoading] = useState(false)
    const [tasks, setTasks] = useState([])
 
    const loadingManager = useContext(loadingContext)
    const userManager = useContext(userContext)
    const dialogManager = useContext(dialogContext)

    const newTaskInput = useRef(null)

    const startEdit = (id) => {
        updateState(id, StateOfTask.Edit, false)
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
        updateState(id, StateOfTask.Pending, false)
    }

    const doneTask = (id) => {
        updateState(id, StateOfTask.Done, true)
    }

    const toggleTaskState = (id) => {

        var currentList = tasks.map((task)=>{ 
            if (task.id === id) {
                if (task.state === StateOfTask.Done) {
                    task.state = StateOfTask.Pending
                } else if (task.state === StateOfTask.Pending) {
                    task.state = StateOfTask.Done
                }
            }
            return task
        })

        setTasks(currentList)
    }

    const updateState = (id, state, showConfetti) => {
        var currentList = tasks.map((task)=>{ 
            if (task.id === id) {
                task.state = state
                task.showConfetti = showConfetti
            }
            return task
        })

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
        if(/^[^<>%{}]*$/.test(descriptions) === false) { return "Some special characters are not allowed." }
        return ""
    }

    const archiveTask = (id) => {
        
        const user = userManager.user
        const taskToArchive = tasks.find((task) => task.id === id)
        setLoading(true)
        const newList = tasks.filter((task)=> task.id !== id)
        TaskService.saveUserTasks(user.uid, newList).then(()=>{
            setTasks(newList)
            return TaskService.archiveUserTask(user.uid, taskToArchive)
        }).catch((error)=> {
            const dialog = new DialogModel("Message", "An error has occurred. Please try again later.", "Ok")
            dialog.callback = ()=> { console.log("") }
            dialogManager.updateDialogMsg(dialog)
        }).finally(()=>{
            setLoading(false)
        })        
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }

    const onDragEnd = (result) => {
        if (!result.destination) return
        if (result.destination.index === result.source.index) return
          
        const updatedTasks = reorder(
            tasks,
            result.source.index,
            result.destination.index
        )
      
        setTasks(updatedTasks)
    }

    useEffect(() => {

        const fetchData = () => {
            if (userManager.user === null) return
            setLoading(true)
            TaskService.getUserTasks(userManager.user.uid)
            .then((result) => {
                setTasks(result)
            }).catch((error) => {
                // redirect to error page
                console.log(error)
                setNotFound(true)
            }).finally(()=>{
                setLoading(false)
            })
        }

        const fetchWiseQuote = () => {
            WiseQuotesService.getWiseQuote().then((quoteModel)=>{
                setQuote(quoteModel)
            }).catch((error)=>{
                console.log(error)
            })
        }

        fetchData()
        fetchWiseQuote()
    }, [userManager, setLoading, setNotFound, setTasks, setQuote])

    // this triggers refresh when shapes is updated
    useEffect(() => {
        const save = () => {
            if (userManager.user === null) return
            if (tasks.length === 0) return

            setLoading(true)
            TaskService.saveUserTasks(userManager.user.uid, tasks).then(() => {
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

    const TaskList = ({ taskList })=> {
        return taskList.map((taskModel, index) => (
            <Draggable key={taskModel.id} draggableId={taskModel.id} index={index}>
            {(provided) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <Task key={taskModel.id} model={taskModel}
                toggleTaskState={()=>{ toggleTaskState(taskModel.id)}}
                doneTask={()=>{ doneTask(taskModel.id)}}
                undoTask={()=>{ undoTask(taskModel.id)}}
                startEdit={()=>{ startEdit(taskModel.id)}}
                endEdit={endEdit} 
                archiveTask={()=>{archiveTask(taskModel.id)}}
                index={index}
            />
            </div>
            )}
            </Draggable>
        ))
    }

    if (notFound) return (<Redirect to={StaticRoutes.NOT_FOUND}/>)
    return (
        <Container>
            <Box flexGrow={1} align="center" py={StandardPadding.PY}>
            <userContext.Consumer>
            {(userManager) => (
             userManager.user ?
             <Box>
                <Box flexGrow={1} align="center" pt={LargePadding.PY} pb={StandardPadding.PY}>
                    <Typography variant="h2" color="primary" mx="auto" >
                        My Todo List
                    </Typography>
                </Box>
                <Box flexGrow={1} align="center" pt={0} pb={StandardPadding.PY}>
                    {quote &&
                        <Typography color="secondary" variant="subtitle1" underline>{quote.quote} - {quote.author}</Typography>
                    }
                </Box>
                <Box flexGrow={1} align="center" pt={StandardPadding.PY} pb={LargePadding.PY}>
                    <Paper xs={ContentWidth.SM} md={ContentWidth.MD}>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="list">
                            { (provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    <TaskList taskList={tasks}/>
                                    {provided.placeholder}
                                </div>
                            )}   
                            </Droppable>
                        </DragDropContext>
                    </Paper>
                </Box>
                <Box flexGrow={1} align="center" py={LargePadding.PY} xs={ContentWidth.SM} md={ContentWidth.MD}>
                    <TextInputArea ref={newTaskInput} rowsMin={3} placeholder="Enter new task" />
                </Box>
                <Box flexGrow={1} align="center" pt={StandardPadding.PY} xs={ContentWidth.SM} md={ContentWidth.MD}>
                    <Button size="large" variant="contained" color="primary" onClick={addNewTask}>Add task</Button>
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