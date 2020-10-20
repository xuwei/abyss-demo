import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from "react-router-dom"
import { userContext } from '../context/UserContext'
import { dialogContext } from '../context/DialogContext'
import { loadingContext } from '../context/LoadingContext'
import { Paper, Typography, Box, Container } from '@material-ui/core'
import { StaticRoutes, LargePadding, StandardPadding, ContentWidth } from '../Configs'
import LoginPanel from '../common/LoginPanel'
import TaskArchive from '../common/TaskArchive'
import { ArchiveFilter } from '../model/TaskArchiveModel'
import TaskService from '../service/TaskService'

// archive page
function ArchivePage() {

    const [notFound, setNotFound] = useState(false)
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState(ArchiveFilter.LAST_7_DAYS)
    const [archives, setArchives] = useState([])

    const loadingManager = useContext(loadingContext)
    const userManager = useContext(userContext)
    const dialogManager = useContext(dialogContext)

    useEffect(() => {
        const fetchData = () => {
            if (userManager.user === null) return
            
            setLoading(true)
            TaskService.getArchiveUserTasks(userManager.user.uid, filter).then((result) => {
                result.sort((a,b) => { return b.order - a.order})
                setArchives(result)
            }).catch((error) => {
                debugger;
                setNotFound(true)
            }).finally(()=>{
                setLoading(false)
            })
        }
        fetchData()
    }, [userManager, setLoading, setNotFound])
    
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
                <Box flexGrow={1} align="center" py={LargePadding.PY}>
                    <Paper xs={ContentWidth.SM} md={ContentWidth.MD}>
                        {archives.map((archiveModel) => (
                            <TaskArchive key={archiveModel.dateString} model={archiveModel} />
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