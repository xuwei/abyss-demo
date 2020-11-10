import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { userContext } from '../context/UserContext'
import { dialogContext } from '../context/DialogContext'
import { loadingContext } from '../context/LoadingContext'
import { Avatar, Button, Container, Box, Typography } from '@material-ui/core'
import { StandardPadding, LargePadding, StaticRoutes } from '../Configs'
import { row } from '../style/CommonStyle'
import UserService from '../service/UserService'
import { reactLocalStorage } from 'reactjs-localstorage'
import DialogModel from '../model/DialogModel'
import RewardService from '../service/RewardService'
import Rewards from '../common/Rewards'
import Bios from '../common/Bios'
import BiosService from '../service/BiosService';

function SettingPage() {

    const history = useHistory()
    const userManager = useContext(userContext)
    const dialogManager = useContext(dialogContext)
    const loadingManager = useContext(loadingContext)
    const [loading, setLoading] = useState(false)
    const [reward, setReward] = useState(null)
    const [bios, setBios] = useState(null)

    const logout = () => {

        const dialog = new DialogModel("Message", "Are you sure of logging out?", "Ok", "Cancel")
        dialog.callback = ()=> { 
            UserService.logout().then(()=> {
                userManager.updateUser(null)
                reactLocalStorage.clear()
            }).finally(()=>{
                history.push(StaticRoutes.HOME)
            })
        }
        dialogManager.updateDialogMsg(dialog)
    }

    useEffect(()=>{
        
        const fetchRewards = () => {
            if (userManager.user === null) return
            if (userManager.user.uid === null) return
            RewardService.getReward(userManager.user.uid).then((rewardModel)=>{
                setReward(rewardModel)
            }).catch((error)=>{
                console.log(error)
            })
        }

        const fetchBios = () => {
            if (userManager.user === null) return
            if (userManager.user.uid === null) return
            BiosService.getBios(userManager.user).then((biosModel)=>{
                debugger;
                setBios(biosModel)
            }).catch((error)=>{
                console.log(error)
            })
        }

        fetchRewards() 
        fetchBios()
    }, [userManager, setLoading, setReward])

    useEffect(() => {
        loadingManager.updateLoadingIndicator(loading)
    }, [loading, loadingManager])

    return (
        <Container>
            <userContext.Consumer>
            {(userManager) => (
             userManager.user &&
            <Box flexGrow={1} mx="auto">
                <Box flexGrow={1} align="center" pt={LargePadding.PY} pb={StandardPadding.PY}>
                    <Typography variant="h2" color="primary" mx="auto" >
                        Settings
                    </Typography>
                </Box>
                <Box flexGrow={1} align="center" pb={StandardPadding.PY} {...row}>
                    <Box p={1}>
                        <Avatar alt={userManager.user.displayName} src={userManager.user.photoURL}/>
                    </Box>
                    <Box p={1} my="auto">
                        <Typography style={{cursor : "pointer"}} variant="h4">{userManager.user.displayName}</Typography>
                    </Box>
                </Box>
                { bios && 
                <Box flexGrow={1} align="center" pb={StandardPadding.PY}>
                    <Bios description={bios}/>
                </Box>
                }
                { reward &&
                <Box flexGrow={1} align="center" pb={StandardPadding.PY}>
                    <Rewards model={reward}/> 
                </Box>
                }
                <Box flexGrow={1} align="center" pb={StandardPadding.PY}>
                    <Button size="small" color="primary" varianet="contained" onClick={logout}>
                        Sign out
                    </Button>
                </Box>
            </Box>
            )}
            </userContext.Consumer>
        </Container>
    )
}

export default SettingPage