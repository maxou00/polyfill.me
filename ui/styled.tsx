import { Button, withStyles } from "@material-ui/core";

export const NoTransformButton = withStyles({
    root: {
        textTransform: 'none'
    }
})(Button);