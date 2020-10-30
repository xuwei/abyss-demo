import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import { userContext } from '../context/UserContext'
import { loadingContext } from '../context/LoadingContext'
import { Box, Container } from '@material-ui/core'
import LinkPanel from '../common/LinkPanel'
import { StaticRoutes, StandardPadding } from '../Configs'
import UserService from '../../Firebase'
import { ProviderType } from '../service/UserService'

// todo page
function LinkAccountPage() {
    
    const [notFound] = useState(false)
    const [loading, setLoading] = useState(false)
    const [provider, setProvider] = useState(null)
 
    const loadingManager = useContext(loadingContext)
    const userManager = useContext(userContext)

    useEffect(()=>{
        if (userManager === null) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [userManager, setLoading])

    useEffect(()=>{
        // const currentProvider = UserService.currentProvider()
        // setProvider(currentProvider)
    },[])

    useEffect(() => {
        loadingManager.updateLoadingIndicator(loading)
    }, [loading, loadingManager])

    if (notFound) return (<Redirect to={StaticRoutes.NOT_FOUND}/>)
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