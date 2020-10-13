import React from 'react'

const loadingContext = React.createContext({ loading : false, updateLoadingIndicator : null})

export { loadingContext }