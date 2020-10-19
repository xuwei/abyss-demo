import React from 'react'
import { Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';


function AnonymousLoginButton(props) {

    const buttonStyle = {
        height: 50,
        width: 240,
        fontSize: 16,
        fontWeight: "lighter"
    }

    return (
        <Button style={{buttonStyle}} variant="contained" size="large" color="primary" onClick={props.onClick}><EditIcon/>&nbsp;&nbsp;Login as guest</Button>
    )
}

export default AnonymousLoginButton