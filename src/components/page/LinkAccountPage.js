import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import { userContext } from '../context/UserContext'
import { loadingContext } from '../context/LoadingContext'
import { Box, Container } from '@material-ui/core'
import LinkPanel from '../common/LinkPanel'
import { StaticRoutes, StandardPadding } from '../Configs'

// todo page
function LinkAccountPage() {
    
    const [loading] = useState(false)
    const loadingManager = useContext(loadingContext)
    const userManager = useContext(userContext)

    useEffect(()=>{
    }, [userManager])

    useEffect(() => {
        loadingManager.updateLoadingIndicator(loading)
    }, [loading, loadingManager])

    if (userManager === null) return (<Redirect to={StaticRoutes.NOT_FOUND}/>)
    return (
        <Container>
            <Box flexGrow={1} align="center" py={StandardPadding.PY}>
            <userContext.Consumer>
            { (userManager) => (
             userManager.user &&
            <Box>
                <LinkPanel title={"Linking to secure data on your Todo Cloud"} />
            </Box>
            )}
            </userContext.Consumer>
            </Box>  
        </Container>
    )
}

export default LinkAccountPage