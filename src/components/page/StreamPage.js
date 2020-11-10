import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from "react-router-dom"
import { userContext } from '../context/UserContext'
import { loadingContext } from '../context/LoadingContext'
import { Box, Paper, Container, Typography } from '@material-ui/core'
import { StandardPadding, LargePadding, ContentWidth, StaticRoutes } from '../Configs'
import StreamService from '../service/StreamService'
import RewardService from '../service/RewardService'
import StreamEvent from '../common/StreamEvent'
import { StreamFilter } from '../model/StreamEventModel'
import LoginPanel from '../common/LoginPanel'
import Rewards from '../common/Rewards'
import StreamFilterTab from '../common/StreamFilterTab'
import Moment from 'moment'

// archive page
function StreamPage() {

    const [streamFilter, setStreamFilter] = useState(StreamFilter.GLOBAL_STREAM)
    const [stream, setStream] = useState([])
    const [reward, setReward] = useState(null)
    const [notFound, setNotFound] = useState(false)
    const [loading, setLoading] = useState(false)

    const loadingManager = useContext(loadingContext)
    const userManager = useContext(userContext)

    const handleStreamFilterUpdate = (e, filterValue)=> {
        setStreamFilter(filterValue)
    }

    useEffect(()=>{

        const fetchRewards = () => {
            if (userManager.user === null) return
            if (userManager.user.uid === null) return
            RewardService.getReward(userManager.user.uid).then((rewardModel)=>{
                setReward(rewardModel)
            }).catch((error)=>{
                console.log(error)
            })
        }

        const fetchStream = () => {
            if (userManager.user === null) return
            setLoading(true)
            StreamService.getStream(streamFilter).then((result)=>{
                result.sort(function(event1, event2) {
                    return event2.created - event1.created
                })

                var processedList = result.map(event => {
                    event.timeAgo = Moment(event.created).fromNow()
                    return event
                })

                setStream(processedList)
            }).catch((error)=>{
                setNotFound(true)
            }).finally(()=>{
                setLoading(false)
            })
        }
        fetchRewards()
        fetchStream()
    },[userManager, streamFilter, setLoading, setNotFound, setReward])

    useEffect(() => {
        loadingManager.updateLoadingIndicator(loading)
    }, [loading, loadingManager])

    if (notFound) return (<Redirect to={StaticRoutes.NOT_FOUND}/>)
    if (streamFilter === StreamFilter.FRIENDS_STREAM || streamFilter === StreamFilter.TEAM_STREAM) {
        return (
            <Container>
                <Box flexGrow={1} align="center" py={StandardPadding.PY}>
                    <Box flexGrow={1} align="center" pt={LargePadding.PY} pb={StandardPadding.PY}>
                        <Typography variant="h2" color="primary" mx="auto" >
                            Stream
                        </Typography>
                    </Box>
                    { reward && 
                    <Box flexGrow={1} align="center" pb={LargePadding.PY}>
                        <Rewards model={reward}/> 
                    </Box>
                    }
                    <Box flexGrow={1} align="center" pb={LargePadding.PY}>
                        <StreamFilterTab onChange={handleStreamFilterUpdate} filterValue={streamFilter}/>
                    </Box>
                    <Box flexGrow={1} align="center" pt={StandardPadding.PY} pb={LargePadding.PY}>
                        <Paper xs={ContentWidth.SM} md={ContentWidth.MD}>
                            <Box py={StandardPadding.PY} px={StandardPadding.PX}>
                                <Typography variant="h6">coming soon...</Typography>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </Container>
        )
    }
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
                { reward && 
                    <Box flexGrow={1} align="center" pb={LargePadding.PY}>
                        <Rewards model={reward}/> 
                    </Box>
                 }
                <Box flexGrow={1} align="center" pb={LargePadding.PY}>
                    <StreamFilterTab onChange={handleStreamFilterUpdate} filterValue={streamFilter}/>
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