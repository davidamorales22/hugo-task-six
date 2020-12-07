import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Paper,
  Slider,
  Toolbar,
  Typography
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'
import { ContextMenu, ContextMenuTrigger } from 'react-contextmenu'
import useController from './controller'

const Task = () => {
  const ctrl = useController()
  return (
    <Container>
      <Box minHeight={600}>
        <Typography variant='h5' color='primary' align='center'>
          Circles Drawer
        </Typography>
        <Divider />
        <Toolbar>
          <Box flex={1} />
          <Button color='primary' variant='contained' disableElevation onClick={ctrl.handleUndo}>
            Undo
          </Button>
          <Box width={16} />
          <Button color='primary' onClick={ctrl.handleRedo}>Redo</Button>
          <Box flex={1} />
        </Toolbar>
        <Box height={24} />
        <ContextMenuTrigger id='context-menu'>
          <Box id='task-canvas-container' height={500} width='100%'>
            <canvas id='task-canvas' onClick={ctrl.handleClick} onContextMenu={ctrl.handleClick} />
          </Box>
        </ContextMenuTrigger>
        <ContextMenu id='context-menu'>
          <Paper elevation={2}>
            {ctrl.selection && (
              <Container>
                <Button onClick={ctrl.handleToggle}>Ajustar diametro</Button>
              </Container>
            )}
            {!ctrl.selection && <Alert severity='warning'>Select a circle</Alert>}
          </Paper>
        </ContextMenu>
        <Dialog open={ctrl.open} fullWidth maxWidth='sm' onClose={ctrl.handleCancel}>
          <DialogContent>
            <Container>
              <Slider defaultValue={50} onChange={ctrl.handleChangeDiameter} max={300} value={ctrl.diameter} />
              <Typography>{`Ajustar Diametro: ${ctrl.diameter}`}</Typography>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button color='primary' variant='contained' disableElevation onClick={ctrl.handleAccept}>Ok</Button>
            <Button onClick={ctrl.handleCancel}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  )
}

export default Task
