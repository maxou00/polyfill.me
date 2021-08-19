import { Box, TextField, Typography } from "@material-ui/core";
import { useMemo } from "react";
import { FieldRendererProps } from ".";

export function TimeFieldRenderer(props: FieldRendererProps) {

    return <Box paddingY={1}>
        <TextField
            fullWidth
            size="small"
            type="time"
            variant="outlined"
            placeholder={props.question.title} />
    </Box>
}