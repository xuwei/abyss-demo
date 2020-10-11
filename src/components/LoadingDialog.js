import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, CircularProgress } from '@material-ui/core'
import { dialogContext } from './context/DialogContext'

function LoadingDialog() {
  const [open, setOpen] = useState(false)

  const showLoading = () => {
    setOpen(true)
  }

  const close = ()=> {
    setOpen(false)
  }

  useEffect(()=> {
    if (open === false) {
      console.log("close")
    }
  }, [open])

  if (open === false) {
    return(
      <Box>
        {props.children}
      </Box>
    )
  }
  return (
    <dialogContext.Provider value={{updateDialogMsg : showDialog}}>
      {props.children}
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogMsg.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMsg.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={close}>
            {dialogMsg.confirm}
          </Button>
        </DialogActions>
      </Dialog>
    </dialogContext.Provider>
  )
}

export default AppDialog 