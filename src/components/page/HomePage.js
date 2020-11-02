import React, { useContext } from 'react'
import { Redirect } from "react-router-dom"
import { Avatar, Hidden, Grid, GridList, GridListTile, Button, Paper, Typography, Box, Container } from '@material-ui/core'
import { StaticImages, StaticRoutes, LargePadding, StandardPadding, ContentWidth } from '../Configs'
import { userContext } from '../context/UserContext'

// home page
function HomePage() {
    
    const userManager = useContext(userContext)
    const autoHeight = {
        display: 'flex', 
        height: 'auto'
    }

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
                <GridList cols={2.5} style={{ flexWrap: 'nowrap', transform: 'translateZ(0)'}} spacing={StandardPadding.PX * 10}>
                    <GridListTile item xs={ContentWidth.SM} md={ContentWidth.MD} style={autoHeight}>
                        <Paper variant="outlined">
                            <Box px={StandardPadding.PX} py={LargePadding.PY}>
                                <Typography variant="body1">
                                    "This is just so intuitive! I don't need to fiddle around too much, just focus on my school work."
                                </Typography>
                                <Box pt={StandardPadding.PX}>
                                    <Avatar alt="Ezequiel" src={StaticImages.user02}/>
                                    <Typography variant="body1">
                                        Ezequiel - Law student
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </GridListTile>
                    <GridListTile item xs={ContentWidth.SM} md={ContentWidth.MD} style={autoHeight}>
                        <Paper variant="outlined">
                            <Box px={StandardPadding.PX} py={LargePadding.PY}>
                                <Typography variant="body1">
                                    "Alot of people ends up with an unrealistic list of todo items. TodoCloud keeps me on track on what's possible TODAY !!!"
                                </Typography>
                                <Box pt={StandardPadding.PX}>
                                    <Avatar alt="Emma" src={StaticImages.user04}/>
                                    <Typography variant="body1">
                                        Emma - Business consultant
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </GridListTile>
                    <GridListTile item xs={ContentWidth.SM} md={ContentWidth.MD} style={autoHeight}>
                        <Paper variant="outlined">
                            <Box px={StandardPadding.PX} py={LargePadding.PY}>
                                <Typography variant="body1">
                                    "WFH has been so stressful for me and my team. Eventually, we decided to simplify tasking as much as we can with todocloud."
                                </Typography>
                                <Box pt={StandardPadding.PX}>
                                    <Avatar alt="Elizabeth" src={StaticImages.user06}/>
                                    <Typography variant="body1">
                                        Michael - Product manager
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </GridListTile>
                    <GridListTile item xs={ContentWidth.SM} md={ContentWidth.MD} style={autoHeight}>
                        <Paper variant="outlined">
                            <Box px={StandardPadding.PX} py={LargePadding.PY}>
                                <Typography variant="body1">
                                    "I just can't be bothered to waste time on fancy software. Glad I found todocloud."
                                </Typography>
                                <Box pt={StandardPadding.PX}>
                                    <Avatar alt="Anastasia" src={StaticImages.user05}/>
                                    <Typography variant="body1">
                                        Anastasia - Personal trainer
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </GridListTile>
                    <GridListTile item xs={ContentWidth.SM} md={ContentWidth.MD} style={autoHeight}>
                        <Paper variant="outlined">
                            <Box px={StandardPadding.PX} py={LargePadding.PY}>
                                <Typography variant="body1">
                                    "I love the firework effects when my task is completed. The aesthetics is important, as long as it does the job."
                                </Typography>
                                <Box pt={StandardPadding.PX}>
                                    <Avatar alt="Anastasia" src={StaticImages.user07}/>
                                    <Typography variant="body1">
                                        Michelle - Finance student
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </GridListTile>
                    <GridListTile item xs={ContentWidth.SM} md={ContentWidth.MD} style={autoHeight}>
                        <Paper variant="outlined">
                            <Box px={StandardPadding.PX} py={LargePadding.PY}>
                                <Typography variant="body1">
                                    "Todocloud is perfect. There was way too many buttons and things I can do on other platforms. Things that I just don't give a f*** about."
                                </Typography>
                                <Box pt={StandardPadding.PX}>
                                    <Avatar alt="Dave" src={StaticImages.user08}/>
                                    <Typography variant="body1">
                                        Dave - Mechanic
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </GridListTile>
                    <GridListTile item xs={ContentWidth.SM} md={ContentWidth.MD} style={autoHeight}>
                        <Paper variant="outlined">
                            <Box px={StandardPadding.PX} py={LargePadding.PY}>
                                <Typography variant="body1">
                                    "I got my kids are using my todocloud account to track their homework items. Keeps them focused on deliverables each week."
                                </Typography>
                                <Box pt={StandardPadding.PX}>
                                    <Avatar alt="Michelle" src={StaticImages.user09}/>
                                    <Typography variant="body1">
                                        Wendy - Mum
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </GridListTile>
                    <GridListTile item xs={ContentWidth.SM} md={ContentWidth.MD} style={autoHeight}>
                        <Paper variant="outlined">
                            <Box px={StandardPadding.PX} py={LargePadding.PY}>
                                <Typography variant="body1">
                                    "Jira has always been the standard tool for us to manage our tickets. But it was stressful for us to manage having to WFH. Glad our team moved to todocloud."
                                </Typography>
                                <Box pt={StandardPadding.PX}>
                                    <Avatar alt="Ella" src={StaticImages.user10}/>
                                    <Typography variant="body1">
                                        Ella - IT support
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </GridListTile>
                </GridList>
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