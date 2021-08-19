import { Box, TextField, Typography } from "@material-ui/core";
import { useMemo } from "react";
import { FieldRendererProps } from ".";

export function FileFieldRenderer(props: FieldRendererProps) {

    return <Box paddingY={1}>
        <TextField
            fullWidth
            size="small"
            type="file"
            variant="outlined"
            placeholder={props.question.title} />
    </Box>
}