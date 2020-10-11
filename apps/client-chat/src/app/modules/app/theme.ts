import { red, grey } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
export const theme = createMuiTheme({
  palette: {
    common: {
      black: '#282835',
    },
    primary: {
      main: '#0fb2d9',
    },
    secondary: {
      main: '#F5F6FA',
      dark: '#9E9E9E',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    text: {
      secondary: '#B7B7B7',
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.2rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: 14,
    },
    body2: {
      fontSize: 14,
    },
    fontFamily: [
      'Poppins',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
    ].join(','),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920,
    },
  },
})

export const themeWithOverrides = {
  ...theme,
  shadows: ['none', '0px 0px 10px #00000026', ...theme.shadows],
  overrides: {
    MuiMenu: {
      paper: {
        boxShadow: '0px 3px 6px #00000029',
        border: '1px solid #F1F1F3',
      },
    },
    MuiListItem: {
      root: {
        paddingTop: theme.spacing(2) + 4,
        paddingBottom: theme.spacing(2) + 4,
      },
    },
    MuiToolbar: {
      gutters: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
      },
    },
    MuiContainer: {
      root: {
        background: grey[50],
      },
    },
    MuiButton: {
      root: {
        fontSize: 16,
        lineHeight: '28px',
        padding: '8px 16px',
        textTransform: 'none',
      },
      contained: {
        fontSize: 14,
        backgroundColor: theme.palette.primary.main,
        fontWeight: 600,
        color: theme.palette.common.white,
        paddingLeft: theme.spacing(2) + 4,
        paddingRight: theme.spacing(2) + 4,
        paddingTop: theme.spacing(1) / 2,
        paddingBottom: theme.spacing(1) / 2,
        borderRadius: theme.spacing(3),
        whiteSpace: 'nowrap',
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
        fontSize: '1rem',
        fontWeight: 600,
      },
    },
    MuiSvgIcon: {
      root: {
        width: 22,
        height: 22,
        color: theme.palette.text.secondary,
      },
    },
    MuiBadge: {
      badge: {
        backgroundColor: theme.palette.primary.main,
        border: '2px solid #FFFFFF',
      },
      dot: {
        height: 12,
        width: 12,
        borderRadius: 6,
      },
    },
    MuiRating: {
      iconFilled: {
        '& > svg': {
          color: '#ffb400',
        },
      },
      icon: {
        '& > svg': {
          width: 16,
          height: 16,
        },
      },
    },
    MuiChip: {
      root: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.dark,
      },
    },
  },
}
