import React, { useEffect } from 'react'
import { Typography, Box, Container } from '@material-ui/core'
import { LargePadding } from '../Configs'

function HomePage() {

    // this triggers refresh when shapes is updated
    useEffect(() => {
    }, [])

    return (
        <Container>
            <Box flexGrow={1} align="center" py={LargePadding.PY}>
                <Typography variant="h2" color="primary" mx="auto" >
                    Abyss Demo
                </Typography>
            </Box>
        </Container>
    )
}

export default HomePage