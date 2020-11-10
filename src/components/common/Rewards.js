import React from 'react'
import { Paper, LinearProgress, Box, Typography } from '@material-ui/core'
import { BorderStyle, row, column } from '../style/CommonStyle'
import { StandardPadding, LargePadding } from '../Configs'
import Clap from '../common/Clap'

function Rewards(props) {

    const model = props.model
    
    return (
        <Paper>
            <Box {...column} borderBottom={BorderStyle} px={StandardPadding.PX} py={LargePadding.PY}>
                <Box {...row}>
                    <Box p={1}>
                        <Typography variant="h4" color="primary">Claps I received</Typography>
                    </Box>
                </Box>
                <Box {...row}>
                    <Box p={1}>
                        <Typography variant="h4"><Clap/></Typography>
                    </Box>
                    <Box flexGrow={1} p={1} my="auto">
                        <LinearProgress variant="determinate" color="secondary" value={model.progress}/>
                    </Box>
                    <Box p={1}>
                        <Typography variant="h4"><span role="img" aria-label="clap">&#127873;</span></Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    )       
}

export default Rewards