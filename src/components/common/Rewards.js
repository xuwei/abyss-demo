import React, { useState } from 'react'
import { Paper, LinearProgress, Box, Typography } from '@material-ui/core'
import { BorderStyle, row, column } from '../style/CommonStyle'
import { StandardPadding, LargePadding } from '../Configs'

function Rewards() {

    const [progress, setProgress] = useState(50)

    return (
        <Paper>
            
            <Box {...column} borderBottom={BorderStyle} px={StandardPadding.PX} py={LargePadding.PY}>
                <Box {...row}>
                    <Box p={1}>
                        <Typography variant="h4" color="primary">My progress to reward</Typography>
                    </Box>
                </Box>
                <Box {...row}>
                    <Box p={1}>
                        <Typography variant="h4"><span role="img" aria-label="clap">&#128079;</span></Typography>
                    </Box>
                    <Box flexGrow={1} p={1} my="auto">
                        <LinearProgress variant="determinate" color="secondary" value={50}/>
                    </Box>
                    <Box p={1}>
                        <Typography variant="h4"><span role="img" aria-label="clap">&#x1f381;</span></Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    )       
}

export default Rewards