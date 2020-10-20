import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core'
import { dialogContext } from './context/DialogContext'
import ObjectUtil from './util/ObjectUtil'

function AppDialog(props) {
  const [open, setOpen] = useState(false);
  const [decision, setDecision] = useState("")
  const [dialogMsg, setDialogMsg] = useState(null)

  const showDialog = (model) => {
    setDialogMsg(model)
  }

  const close = ()=> {
    setOpen(false)
  }

  const madeDecision = (choice) => {
    setDecision(choice)
    setOpen(false)
  }

  useEffect(()=> {
    if (dialogMsg === null) return 
    if (decision === dialogMsg.confirm) {
      if (dialogMsg != null && ObjectUtil.isFunction(dialogMsg.callback))  {
        dialogMsg.callback()
      }
    } else if (decision === dialogMsg.cancel) {
      if (dialogMsg != null && ObjectUtil.isFunction(dialogMsg.cancel))  {
        dialogMsg.cancelCallback()
      }
    }
  }, [decision, dialogMsg])

  useEffect(() => {
    const model = dialogMsg
    if (model != null && model.title != null && model.message != null && model.confirm != null) {
      setOpen(true)
    }
  }, [dialogMsg])

  if (dialogMsg === null) {
    return(
      <dialogContext.Provider value={{updateDialogMsg : showDialog}}>
        {props.children}
      </dialogContext.Provider>
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
        {dialogMsg.cancel.length > 0 ?
        <DialogActions>
          <Button color="primary" onClick={madeDecision(dialogMsg.confirm)}>
            {dialogMsg.confirm}
          </Button>
          <Button color="primary" onClick={madeDecision(dialogMsg.cancel)}>
            {dialogMsg.cancel}
          </Button>
        </DialogActions>
        :
        <DialogActions>
          <Button color="primary" onClick={madeDecision(dialogMsg.confirm)}>
            {dialogMsg.confirm}
          </Button>
        </DialogActions>
         }
      </Dialog>
    </dialogContext.Provider>
  )
}

export default AppDialog 