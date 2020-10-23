import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from "react-router-dom"
import { userContext } from '../context/UserContext'
import { dialogContext } from '../context/DialogContext'
import { loadingContext } from '../context/LoadingContext'
import { Tab, Tabs, Paper, Typography, Box, Container } from '@material-ui/core'
import { StaticRoutes, LargePadding, StandardPadding, ContentWidth } from '../Configs'
import LoginPanel from '../common/LoginPanel'
import TaskArchive from '../common/TaskArchive'
import { ArchiveFilter } from '../model/TaskArchiveModel'
import TaskService from '../service/TaskService'
import DialogModel from '../model/DialogModel'

// archive page
function ArchivePage() {

    const [notFound, setNotFound] = useState(false)
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState(ArchiveFilter.LAST_7_DAYS)
    const [archives, setArchives] = useState([])

    const loadingManager = useContext(loadingContext)
    const userManager = useContext(userContext)
    const dialogManager = useContext(dialogContext)

    const handleFilterUpdate = (e, filterValue)=> {
        setFilter(filterValue)
    }

    const findArchiveModelIndex = (dateString) => {
        var newArchives = archives
        const index = newArchives.findIndex(element => element.dateString === dateString)
        return index
    }

    const findTaskModel = (dateString, taskId) => {
        const newArchives = archives
        const index = findArchiveModelIndex(dateString)
        var resultArchieve = newArchives[index]
        const taskModel = resultArchieve.tasks.find(task => task.id === taskId)
        return taskModel
    }

    const removeTaskFromArchive = (dateString, taskId) => {
        debugger;
        var newArchives = archives
        const index = findArchiveModelIndex(dateString)
        var updatedArchive = newArchives[index]
        updatedArchive = updatedArchive.deleteArchivedTask(taskId)
        newArchives[index] = updatedArchive
        return newArchives
    }

    const deleteArchivedTask = (dateString, taskId)=> {
        if (userManager.user === null) return 
        if (dateString === null) return
        if (taskId === null) return 

        const uid = userManager.user.uid
        const dialog = new DialogModel("Message", "Delete task permanently ?", "Ok", "Cancel")
        dialog.callback = ()=> { 
            setLoading(true)
            TaskService.deleteArchivedTask(uid, dateString, taskId).then(()=>{
                const newArchives = removeTaskFromArchive(dateString, taskId)
                setArchives(newArchives)
            }).catch((error)=>{
                console.log(error)
            }).finally(()=>{
                setLoading(false)
            })
        }
        dialogManager.updateDialogMsg(dialog)
    }

    const restoreTask = (dateString, taskId)=> {
        if (userManager.user === null) return
        const uid = userManager.user.uid
        const dialog = new DialogModel("Message", "Restore task to active todo list ?", "Ok", "Cancel")
        const callback = ()=> {
            setLoading(true)
            const taskModelToRestore = findTaskModel(dateString, taskId)
            TaskService.restoreArchivedUserTask(uid, taskModelToRestore).then(()=>{
                return TaskService.deleteArchivedTask(uid, dateString, taskId)
            }).then(()=>{
                const newArchives = removeTaskFromArchive(dateString, taskId)
                setArchives(newArchives)
            }).catch((error)=>{
                console.log(error)
            }).finally(()=>{
                setLoading(false)
            })
        }
        dialog.callback = callback
        dialogManager.updateDialogMsg(dialog)   
    }

    useEffect(() => {
        const fetchData = () => {
            if (userManager.user === null) return
            setLoading(true)
            TaskService.getArchiveUserTasks(userManager.user.uid, filter).then((result) => {
                result.sort((a,b) => { return b.order - a.order})
                setArchives(result)
            }).catch((error) => {
                setNotFound(true)
            }).finally(()=>{
                setLoading(false)
            })
        }
        fetchData()
    }, [userManager, filter, setLoading, setNotFound])
    
    useEffect(() => {
        loadingManager.updateLoadingIndicator(loading)
    }, [loading, loadingManager])

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
                        My Todo Archive
                    </Typography>
                </Box>
                <Box flexGrow={1} align="center" pb={LargePadding.PY}>
                    <Tabs
                        value={filter}
                        onChange={handleFilterUpdate}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab value={ArchiveFilter.LAST_7_DAYS} label="7 days" />
                        <Tab value={ArchiveFilter.LAST_14_DAYS} label="14 days" />
                        <Tab value={ArchiveFilter.LAST_21_DAYS} label="21 days" />
                    </Tabs>
                </Box>
                <Box flexGrow={1} align="center" py={LargePadding.PY}>
                    <Paper xs={ContentWidth.SM} md={ContentWidth.MD}>
                        {archives.map((archiveModel) => (
                            <TaskArchive key={archiveModel.dateString} model={archiveModel} deleteTask={deleteArchivedTask} restoreTask={restoreTask} />
                        ))}
                    </Paper>
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

export default ArchivePage