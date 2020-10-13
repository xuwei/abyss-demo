import React, { useContext } from 'react'
import { Redirect } from "react-router-dom"
import { Link, Hidden, Grid, Button, Paper, Typography, Box, Container } from '@material-ui/core'
import { StaticImages, StaticRoutes, LargePadding, StandardPadding, ContentWidth } from '../Configs'
import { userContext } from '../context/UserContext'

// home page
function HomePage() {
    
    const userManager = useContext(userContext)

    if (userManager.user !== null) return (<Redirect to={StaticRoutes.TODO}/>)
    return (
        <Container>
            <Box flexGrow={1} align="center" py={LargePadding.PY}>
                <Grid item xs={ContentWidth.SM} md={ContentWidth.MD}>
                    <Typography variant="h2" color="primary" mx="auto" >
                        Manage your todo list in the cloud
                    </Typography>
                    <Typography variant="h5" color="textPrimary" mx="auto">
                        Minimise overhead of managing tasks<br/>
                        Simple, practical design<br/>
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
                                    Easy to use. Leverage on state of art platform. Encrypted storage
                                </Typography>
                                <Typography variant="h6">
                                    <Link href={StaticRoutes.TODO} color="primary">
                                        Try it now
                                    </Link>
                                </Typography>
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
                                    Say good bye to overly complicated UI/UX for task management tools.
                                </Typography>
                                <Typography variant="h6">
                                    <Link href={StaticRoutes.TODO} color="primary">
                                        Try it now
                                    </Link>
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <Box flexGrow={1} align="center" py={LargePadding.PY}>
                <Typography variant="h5">
                    Zero friction to your productivity with intuitive design and features.
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
                                <Typography variant="h6">Built with Scalability</Typography>
                            </Box>
                            <Box pb={LargePadding.PY}>
                                <Typography variant="h6">Customisable to your flavor</Typography>
                            </Box>
                            <Box pb={LargePadding.PY}>
                                <Typography variant="h6">Zero learning curve</Typography>
                            </Box>
                            <Box pb={LargePadding.PY}>
                                <Typography variant="h6">Automatically encrypt your stored data</Typography>
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