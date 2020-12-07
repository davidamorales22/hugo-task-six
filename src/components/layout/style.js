import { colors } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
export default makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: colors.blueGrey[50],
    minHeight: '100vh'
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    right: theme.spacing(1),
    fontSize: '.85rem',
    zIndex: -1
  }
}))
