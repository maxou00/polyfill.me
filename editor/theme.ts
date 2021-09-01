import { createTheme } from "@material-ui/core";
import { blue, deepPurple } from "@material-ui/core/colors";

export const theme = createTheme({
    palette: {
        primary: deepPurple
    },
    typography: {
        fontFamily: 'Work Sans',
        fontSize: 12,
    }
})

theme.shadows[1] = '1px 1px 2px #e5e5e5';
theme.shadows[2] = '1px 1px 4px #dddddd';