import { Hidden, Checkbox, Box, Typography, TextField } from '@material-ui/core'
import React, { useState, useEffect, useContext } from 'react'
import { loadingContext } from '../context/LoadingContext'
import { StateOfTask } from '../model/TaskModel'
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import ArchiveIcon from '@material-ui/icons/Archive'
import UndoIcon from '@material-ui/icons/Undo'
import { IconButton } from '@material-ui/core'
import { PaperBackgroundColor, BorderStyle, DefaultIconFontSize } from '../style/CommonStyle'
import Confetti from 'react-dom-confetti'
import { MaxFocusItems } from '../Configs'
import { row, column } from '../style/CommonStyle'

function Task(props) {

    const model = props.model
    const [desc, setDesc] = useState(model.descriptions)
    const [showConfetti, setShowConfetti] = useState(false)
    const loadingManager = useContext(loadingContext)

    const randomColors = ()=> {
        const defaultPool = ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
        const alternatePool = ["#00feca", "#fdf200", "#ff85ea", "#7b61f8"]
        const colorPools = [defaultPool, alternatePool]
        const randIndex = Math.floor(Math.random() * colorPools.length)
        return colorPools[randIndex]
    }

    const config = {
        angle: "360",
        spread: "360",
        startVelocity: "60",
        elementCount: "90",
        dragFriction: "0.13",
        duration: 3000,
        stagger: "3",
        width: "10px",
        height: "10px",
        perspective: "400px",
        colors: randomColors()
    }

    const handleTextChange = e => {
        setDesc(e.target.value);
    }

    useEffect(() => {
        if (model.state === StateOfTask.Done && model.showConfetti !== undefined && model.showConfetti !== null && showConfetti === false && loadingManager.loading === false) {
            setShowConfetti(true)
        }
    }, [model, showConfetti, loadingManager])

    useEffect(()=>{
        if (showConfetti === true) {
            model.showConfetti = null
        }
    }, [showConfetti, model.showConfetti])

    const opacityByIndex = ()=>{
        const diff = props.index - MaxFocusItems
        return Math.max(0.45, 0.65 - diff*0.025)
    }

    switch(model.state) {
        case StateOfTask.Pending:
            return(
                <Box {...column} bgcolor={PaperBackgroundColor} style={props.index >= MaxFocusItems ? { opacity : opacityByIndex()} : {opacity : 1.0}} borderBottom={BorderStyle}>
                    <Box {...row}>
                        <Hidden smDown>
                            <Box p={1}>
                                <Checkbox checked={false} onChange={props.checkEvent} onClick={props.doneTask}/>
                            </Box>
                        </Hidden>
                        <Box p={1}>
                            <Typography align="left" variant="h4" color="primary">{model.descriptions}</Typography>
                        </Box>
                    </Box>
                    <Box {...row} justifyContent="flex-end">
                        <Box p={1}>
                            <IconButton onClick={props.startEdit}><EditIcon fontSize={DefaultIconFontSize}/></IconButton>
                        </Box>
                        <Box p={1}>
                            <IconButton onClick={props.doneTask}><DoneIcon fontSize={DefaultIconFontSize}/></IconButton>
                        </Box>
                        <Box p={1}>
                            <IconButton onClick={props.archiveTask}><ArchiveIcon fontSize={DefaultIconFontSize}/></IconButton>
                        </Box>
                    </Box>
                </Box>
            )
        case StateOfTask.Edit:
            return(
                <Box {...column} borderBottom={BorderStyle}>
                    <Box {...row}>
                        <Hidden smDown>
                            <Box p={1}>
                                <Checkbox disabled checked={false} onChange={props.checkEvent}/>
                            </Box>
                        </Hidden>
                        <Box p={1} width="90%">
                            <TextField InputProps={{style: {fontSize: "1.2rem"}}} fullWidth={true} defaultValue={model.descriptions} onChange={handleTextChange}/>
                        </Box >
                    </Box>
                    <Box {...row} justifyContent="flex-end">
                        <Box p={1}>
                            <IconButton onClick={() => props.endEdit(model.id, desc)}><EditIcon fontSize={DefaultIconFontSize}/></IconButton>
                        </Box>
                        <Box p={1}>
                            <IconButton disabled={true} onClick={props.doneTask}><DoneIcon fontSize={DefaultIconFontSize}/></IconButton>
                        </Box>
                        <Box p={1}>
                            <IconButton disabled={true} onClick={props.archiveTask}><ArchiveIcon fontSize={DefaultIconFontSize}/></IconButton>
                        </Box>
                    </Box>
                </Box>
            )
        case StateOfTask.Done:
            return ( 
                <Box {...column} bgcolor={PaperBackgroundColor} style={props.index >= MaxFocusItems ? { opacity : 0.5} : {opacity : 1.0}} borderBottom={BorderStyle}>
                    <Box {...row}>
                        <Hidden smDown>
                            <Box p={1}>
                                <Checkbox color="primary" checked={true} onClick={props.toggleTaskState}/>
                            </Box>
                        </Hidden>
                        <Box p={1}>
                            <Typography align="left" variant="h4" style={{textDecoration : "line-through"}}>{model.descriptions}</Typography>
                        </Box>
                    </Box>
                    <Box {...row}><Confetti active={showConfetti} config={config} /></Box>
                    <Box {...row} justifyContent="flex-end">
                        <Box p={1}>
                            <IconButton onClick={props.undoTask}><UndoIcon fontSize={DefaultIconFontSize}/></IconButton>
                        </Box>
                        <Box p={1}>
                            <IconButton onClick={props.archiveTask}><ArchiveIcon fontSize={DefaultIconFontSize}/></IconButton>
                        </Box>
                    </Box>
                </Box>
            )
        default:
            return(<div>invalid state</div>)
    }
}

export default Task