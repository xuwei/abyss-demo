import React from 'react'
import { TextareaAutosize } from '@material-ui/core'

const TextInputArea = React.forwardRef((props, ref)=> {

    const textAreaStyle = {
        "width": "100%",
        "textAlign" : "center",
        "backgroundColor" : "black",
        "color" : "white",
        "wrap" : "hard"
    }

    return (
        <TextareaAutosize ref={ref} rowsMin={3} placeholder={props.placeholder} style={textAreaStyle} />
    )
})

export default TextInputArea