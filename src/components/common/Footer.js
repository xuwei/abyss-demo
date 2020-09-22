import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { LargePadding } from '../Configs'


function Footer() {
    return (
        <Box mx="auto" flexGrow={1} align="center" py={LargePadding.PY}>
            <Typography variant="caption" color="textPrimary" mx="auto">
                &copy;2020 Xuwei Liang
            </Typography>
        </Box>
    )
}

export default Footer