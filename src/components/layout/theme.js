import { colors } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.blueGrey[900]
    },
    secondary: {
      main: colors.blue[500]
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    }
  },
  typography: {
    useNextVariants: true
    // fontFamily: 'Poppins'
  },
  overrides: {
    MuiFormHelperText: {
      root: {
        fontSize: '1em'
      }
    },
    MuiExpansionPanelSummary: {
      content: {}
    },
    MuiPaper: {
      root: {
        backgroundColor: 'white'
      },
      elevation1: {
        boxShadow: '0 0 14px 0 rgba(53,64,82,.05)'
      }
    },
    MuiDrawer: {
      paper: {
        background: 'white'
      }
    },
    MuiButton: {
      root: {
        textTransform: 'none',
        color: '#424242'
      }
    }
  }
})

export default theme
