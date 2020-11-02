import React, { useContext } from 'react'
import { Redirect } from "react-router-dom"
import { Avatar, Hidden, Grid, Button, Paper, Typography, Box, Container } from '@material-ui/core'
import { StaticImages, StaticRoutes, LargePadding, StandardPadding, ContentWidth } from '../Configs'
import { userContext } from '../context/UserContext'
import CustomerFeedbacks from '../common/CustomerFeedbacks'

// home page
function HomePage() {
    
    const userManager = useContext(userContext)

    if (userManager.user !== null) return (<Redirect to={StaticRoutes.TODO}/>)
    return (
        <Container>
            <Box flexGrow={1} align="center" py={LargePadding.PY}>
                <Grid item xs={ContentWidth.SM} md={ContentWidth.MD}>
                    <Box py={StandardPadding.PY}>
                    <Hidden mdUp>
                        <img src={StaticImages.googleCloudLogo320} alt="built with google cloud"/>
                    </Hidden>
                    <Hidden smDown>
                        <img src={StaticImages.googleCloudLogo320} alt="built with google cloud"/>
                    </Hidden>
                    </Box>
                    <Typography variant="h2" color="primary" mx="auto" >
                        Centralise, organise and analyse
                    </Typography>
                    <Typography variant="h5" color="textPrimary" mx="auto">
                        Filter out noises from complicated tasking tools<br/>
                    </Typography>
                    <Box py={LargePadding.PY}>
                        <Button size="large" href={StaticRoutes.TODO} variant="contained" color="primary" my={4}>Get started</Button>
                    </Box>
                </Grid>
            </Box>
            <Box flexGrow={1} align="center" py={LargePadding.PY}>
                <Grid container direction="row" justity="center" alignItems="flex-start" spacing={1}>
                    <Grid item xs={ContentWidth.SM} md={ContentWidth.MD}>
                        <Paper variant="outlined">
                            <Box px={StandardPadding.PX} pt={LargePadding.PY}>
                                <Hidden mdUp>
                                    <img width="100%" src={StaticImages.screenshot01} alt="todo cloud" />
                                </Hidden>
                            </Box>
                            <Box px={StandardPadding.PX} py={LargePadding.PY}>
                                <Typography variant="body1">
                                    "Easy to use, back to first principle with productivity tools. Filtering out noises was especially important for me when I had to work from home."
                                </Typography>
                                <Box pt={StandardPadding.PX}>
                                    <Avatar alt="Rob" src={StaticImages.user01}/>
                                    <Typography variant="body1">
                                        Rob - Developer
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={ContentWidth.SM} md={ContentWidth.MD}>
                        <Box style={{overflow: "hidden"}} px={StandardPadding.PX} py={StandardPadding.PY}>
                            <Hidden smDown>
                                <img src={StaticImages.screenshot01} alt="image1" />
                            </Hidden>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box flexGrow={1} align="center" py={LargePadding.PY}>
                <Grid container direction="row" justity="center" alignItems="flex-start" spacing={1}>
                    <Grid item xs={ContentWidth.SM} md={ContentWidth.MD}>
                        <Box px={StandardPadding.PX} py={LargePadding.PY}>
                            <Hidden smDown>
                                <img src={StaticImages.screenshot02} alt="todo cloud" />
                            </Hidden>
                        </Box>
                    </Grid>
                    <Grid item xs={ContentWidth.SM} md={ContentWidth.MD}>
                        <Paper variant="outlined">
                            <Box px={StandardPadding.PX} pt={LargePadding.PY}>
                                <Hidden mdUp>
                                    <img width="100%" src={StaticImages.screenshot02} alt="todo cloud" />
                                </Hidden>
                            </Box>
                            <Box px={StandardPadding.PX} py={LargePadding.PY}>
                                <Typography variant="body1">
                                    "Helps me to organise my completed tasks. I felt encouraged revising daily progress I've achieved."
                                </Typography>
                                <Box pt={StandardPadding.PX}>
                                    <Avatar alt="Elizabeth" src={StaticImages.user03}/>
                                    <Typography variant="body1">
                                        Elizabeth - Accountant
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <Box flexGrow={1} align="center" py={LargePadding.PY}>
                <Hidden smDown>
                    <CustomerFeedbacks cols={2.5}/>
                </Hidden>
                <Hidden mdUp>
                    <CustomerFeedbacks cols={1.5}/>
                </Hidden>
            </Box>
            <Box flexGrow={1} align="center" py={LargePadding.PY}>
                <Typography variant="h5">
                    "Until we can manage time, we can manage nothing else."<br/>
                    - Peter Drucker, management consultant
                </Typography>
            </Box>
            <Box flexGrow={1} align="center" py={LargePadding.PY}>
                <Grid item xs={ContentWidth.SM} md={ContentWidth.MD}>
                    <Typography variant="h2" color="primary">
                        Features
                    </Typography>
                    <Box py={LargePadding.PY}>
                        <Paper variant="outlined">
                            <Box py={LargePadding.PY}>
                                <Typography variant="h6">Built with Google Cloud</Typography>
                            </Box>
                            <Box pb={LargePadding.PY}>
                                <Typography variant="h6">Zero learning curve</Typography>
                            </Box>
                            <Box pb={LargePadding.PY}>
                                <Typography variant="h6">Automatically encrypt your stored data</Typography>
                            </Box>
                            <Box pb={LargePadding.PY}>
                                <Typography color="primary" variant="h6"><span style={{ textDecoration : 'line-through'}}>$47/yr</span> FREE - Limited Time !!!</Typography>
                            </Box>
                        </Paper>
                    </Box>
                    <Box py={LargePadding.PY}>
                        <Button size="large" href={StaticRoutes.TODO} variant="contained" color="primary" my={StandardPadding.PY}>Get started</Button>
                    </Box>
                </Grid>
            </Box>
        </Container>
    )
}

export default HomePage