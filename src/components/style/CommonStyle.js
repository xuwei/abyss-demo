import { createMuiTheme } from '@material-ui/core/styles'

const CommonStyle = { }

const DefaultTheme = createMuiTheme({
    palette: {
      type:  'dark',
      primary: {
        main: '#edff14'
      },
      secondary: {
        main: '#e0ffff'
      }
    }
})

const column = {
  display: "flex",
  flexDirection: "column",
  p: 1,
  m: 0,
}

const row = {
  display: "flex",
  flexDirection: "row"
}

const BorderStyle = "1px solid #303030"
const DefaultIconFontSize = "small"
const PaperBackgroundColor = "#424242"

export default CommonStyle
export { BorderStyle, DefaultIconFontSize, PaperBackgroundColor, DefaultTheme, row, column }