import { Box, TextField, Typography } from "@material-ui/core";
import { useMemo } from "react";
import { FieldRendererProps } from ".";

export function NumberFieldRenderer(props: FieldRendererProps) {

    return <Box paddingY={1}>
        <TextField
            fullWidth
            size="small"
            type="number"
            variant="outlined"
            placeholder={props.question.title} />
    </Box>
}