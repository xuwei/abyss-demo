import React, { useState, useEffect } from 'react'
import { Avatar, GridList, GridListTile, Paper, Typography, Box } from '@material-ui/core'
import { LargePadding, StandardPadding, ContentWidth } from '../Configs'
import FeedbackService from '../service/FeedbackService'

function CustomerFeedbacks(props) {
    
    const [feedbacks, setFeedbacks] = useState([])
    const autoHeight = {
        display: 'flex', 
        height: 'auto'
    }

    useEffect(()=>{
        const customerFeedbacks = FeedbackService.getFeedbacks()
        setFeedbacks(customerFeedbacks)
    }, [setFeedbacks])

    return (
        <GridList cols={props.cols} style={{ flexWrap: 'nowrap', transform: 'translateZ(0)'}} spacing={StandardPadding.PX * 10}>
            { feedbacks.map((feedbackModel)=>(
                <GridListTile item xs={ContentWidth.SM} md={ContentWidth.MD} style={autoHeight}>
                <Paper variant="outlined">
                    <Box px={StandardPadding.PX} py={LargePadding.PY}>
                        <Typography variant="body1">
                            "{feedbackModel.comment}"
                        </Typography>
                        <Box pt={StandardPadding.PX}>
                            <Avatar alt={feedbackModel.author} src={feedbackModel.url}/>
                            <Typography variant="body1">
                                {feedbackModel.author} - {feedbackModel.occupation}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
                </GridListTile>
            ))
            }
        </GridList>
    )
}

export default CustomerFeedbacks