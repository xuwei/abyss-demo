import React, { useState } from "react";
import { loadingContext } from './context/LoadingContext'

function LoadingIndicator(props) {

    const [loading, setLoading] = useState(false)

    const update = (isLoading) => {
        setLoading(isLoading)
    }
   
    return(
        <loadingContext.Provider value={{loading: loading, updateLoadingIndicator : update}}>
            {props.children}
        </loadingContext.Provider>
    )
    
}

export default LoadingIndicator