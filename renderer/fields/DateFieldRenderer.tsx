import { Box, TextField, Typography } from "@material-ui/core";
import { useMemo } from "react";
import { FieldRendererProps } from ".";

export function DateFieldRenderer(props: FieldRendererProps) {

    return <Box paddingY={1}>
        <TextField
            fullWidth
            size="small"
            type={props.question.format === "datetime-local" ? "datetime" : "date"}
            variant="outlined"
            placeholder={props.question.title} />
    </Box>
}