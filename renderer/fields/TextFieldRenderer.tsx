import { Box, TextField, Typography } from "@material-ui/core";
import { useMemo } from "react";
import { FieldRendererProps } from ".";

export function TextFieldRenderer(props: FieldRendererProps) {

    const fieldType = useMemo(() => {
        if (props.question.format === "email") {
            return "email";
        }
        return "text";
    }, [props.question]);

    return <Box paddingY={1}>
        <TextField
            fullWidth
            size="small"
            type={fieldType}
            variant="outlined"
            multiline={props.question.format === "paragraph"}
            placeholder={props.question.title} />
    </Box>
}