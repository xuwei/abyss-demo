import React, { useContext } from 'react'
import { Redirect } from "react-router-dom"
import { Avatar, Hidden, Grid, Button, Paper, Typography, Box, Container } from '@material-ui/core'
import { StaticImages, StaticRoutes, LargePadding, StandardPadding, ContentWidth } from '../Configs'
import { userContext } from '../context/UserContext'
import CustomerFeedbacks from '../common/CustomerFeedbacks'
import Vimeo from '@u-wave/react-vimeo'

// home page
function HomePage() {
    
    const userManager = useContext(userContext)

    if (userManager.user !== null) return (<Redirect to={StaticRoutes.TODO}/>)
    return (
        <Container>
            <Box flexGrow={1} align="center" py={LargePadding.PY}>
                <Grid item xs={ContentWidth.SM} md={ContentWidth.MD}>
                    <Typography variant="h2" color="primary" mx="auto" >
                        Task tool with zero learning curve
                    </Typography>
                    <Typography variant="h5" color="textPrimary" mx="auto">
                        Filter out noises from complicated tasking tools<br/>
                    </Typography>
                    <Box py={LargePadding.PY}>
                        <Button size="large" href={StaticRoutes.TODO} variant="contained" color="primary" my={4}>Get started</Button>
                    </Box>
                </Grid>
            </Box>
        </Container>
    )
}

export default HomePage