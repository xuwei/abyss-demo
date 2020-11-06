import React from 'react'
import { Grid, Paper, Typography, Box, Container } from '@material-ui/core'
import { LargePadding, ContentWidth } from '../Configs'
import Vimeo from '@u-wave/react-vimeo'

// home page
function FAQPage() {

    return (
        <Container>
            <Box flexGrow={1} align="center" py={LargePadding.PY}>
                <Grid item xs={ContentWidth.SM} md={ContentWidth.MD}>
                    <Typography variant="h2" color="primary">
                        FAQ
                    </Typography>
                    <Box py={LargePadding.PY}>
                        <Paper variant="outlined">
                            <Box px={LargePadding.PY}>
                                <Box py={LargePadding.PY}>
                                    <Typography color="primary" variant="body1">Do you see my todo items in the background?</Typography>
                                    <Typography variant="body1">No. We have very strict protocol to protect our user's privacy and data is stored in encrypted format on our infrastructure. Your todo items will never be visible to anyone.</Typography>
                                </Box>
                                <Box py={LargePadding.PY}>
                                    <Typography color="primary" variant="body1">What's the difference between a bunch of other todo softwares?</Typography>
                                    <Typography variant="body1">Our mission is to design software that is efficient and minimalistic. Our goal is to bring back your productivity, motivation and zen energy.</Typography>
                                </Box>
                                <Box pb={LargePadding.PY}>
                                    <Typography color="primary" variant="body1">Is there going to be more features soon?</Typography>
                                    <Typography variant="body1">Yes. We have a roadmap to release fun and niche features for our users. We are not going to build all the missing features default to numerous other todo apps.</Typography>
                                </Box>
                                <Box pb={LargePadding.PY}>
                                    <Typography color="primary" variant="body1">Is there going to be a mobile app?</Typography>
                                    <Typography variant="body1">Not right now. However you can install todocloud.io as a PWA app on you phone following the video below.</Typography>
                                </Box>
                                <Box pb={LargePadding.PY}>
                                    <Vimeo video="476199642" autoplay={false} mx="auto"/>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </Box>
        </Container>
    )
}

export default FAQPage