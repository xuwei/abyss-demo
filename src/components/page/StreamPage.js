import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from "react-router-dom"
import { userContext } from '../context/UserContext'
import { loadingContext } from '../context/LoadingContext'
import { Tabs, Tab, Box, Paper, Container, Typography } from '@material-ui/core'
import { StandardPadding, LargePadding, ContentWidth, StaticRoutes } from '../Configs'
import StreamService from '../service/StreamService'
import StreamEvent from '../common/StreamEvent'
import { StreamFilter } from '../model/StreamEventModel'
import LoginPanel from '../common/LoginPanel'

// archive page
function StreamPage() {

    const [streamFilter, setStreamFilter] = useState(StreamFilter.GLOBAL_STREAM)
    const [stream, setStream] = useState([])
    const [notFound, setNotFound] = useState(false)
    const [loading, setLoading] = useState(false)

    const loadingManager = useContext(loadingContext)
    const userManager = useContext(userContext)

    const handleStreamFilterUpdate = ()=> {

    }

    useEffect(()=>{
        const fetchStream = () => {
            if (userManager.user === null) return
            setLoading(true)
            StreamService.getStream().then((result)=>{
                setStream(result)
            }).catch((error)=>{
                setNotFound(true)
            }).finally(()=>{
                setLoading(false)
            })
        }
        fetchStream()
    },[userManager, setLoading, setNotFound])

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
                <Box flexGrow={1} align="center" pt={LargePadding.PY} pb={StandardPadding.PY}>
                    <Typography variant="h2" color="primary" mx="auto" >
                        Stream
                    </Typography>
                </Box>
                <Box flexGrow={1} align="center" pb={LargePadding.PY}>
                    <Tabs
                        value={streamFilter}
                        onChange={handleStreamFilterUpdate}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab value={StreamFilter.GLOBAL_STREAM} label="Global" />
                        <Tab value={StreamFilter.MY_STREAM} label="Friends" />
                        <Tab value={StreamFilter.TEAM_STREAM} label="Team" />
                    </Tabs>
                </Box>
                <Box flexGrow={1} align="center" pt={StandardPadding.PY} pb={LargePadding.PY}>
                    <Paper xs={ContentWidth.SM} md={ContentWidth.MD}>
                    {
                        stream.map((streamEventModel) => (
                            <StreamEvent key={streamEventModel.id} model={streamEventModel}/>
                        ))
                    }                         
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

export default StreamPage