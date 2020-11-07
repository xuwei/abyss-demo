import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from "react-router-dom"
import { userContext } from '../context/UserContext'
import { dialogContext } from '../context/DialogContext'
import { loadingContext } from '../context/LoadingContext'
import { Box, Paper, Container, Typography } from '@material-ui/core'
import { StandardPadding, LargePadding, ContentWidth, StaticRoutes } from '../Configs'
import StreamService from '../service/StreamService'
import StreamEvent from '../common/StreamEvent'
import LoginPanel from '../common/LoginPanel'

// archive page
function StreamPage() {

    const [stream, setStream] = useState([])
    const [notFound, setNotFound] = useState(false)
    const [loading, setLoading] = useState(false)

    const loadingManager = useContext(loadingContext)
    const userManager = useContext(userContext)
    const dialogManager = useContext(dialogContext)

    useEffect(()=>{
        
        const fetchStream = ()=>{
            if (userManager.user === null) return
            setLoading(true)
            StreamService.getStream((stream)=>{
                setStream(stream)
            }).catch((error)=>{
                // redirect to error page
                console.log(error)
                setNotFound(true)
            }).finally(()=>{
                setLoading(false)
            })
        }
        fetchStream()
    },[setStream, userManager, setLoading, setNotFound])

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