import React from 'react'
import FacebookLogin from 'react-facebook-login';

function FacebookLoginButton(props) {

    const containerStyle =  {
        "box-shadows": "rgba(0, 0, 0, 0.25) 0px 2px 4px 0px"
    }
    
    const buttonStyle = {
        backgroundColor : "#1877F2",
        height: 50,
        width: 240,
        margin: 0,
        padding: 0,
        fontSize: 16,
        fontWeight: "lighter"
    }

    return (
        <FacebookLogin
                    containerStyle={containerStyle}
                    buttonStyle={buttonStyle}
                    appId={props.appId}
                    autoLoad={false}
                    fields="name,email,picture"
                    icon="fa-lg fa-facebook-square"
                    onClick={props.onClick} />
    )
}

export default FacebookLoginButton