import { Box, MenuItem, TextField, Typography } from "@material-ui/core";
import { useMemo } from "react";
import { FieldRendererProps } from ".";

export function DropdownFieldRenderer(props: FieldRendererProps) {

    return <Box paddingY={1}>
        <TextField
            fullWidth
            select
            size="small"
            variant="outlined"
            placeholder={props.question.title}>
            {
                props.question.options.map((o) => {
                    return <MenuItem key={o.value} value={o.value}>{o.value}</MenuItem>
                })
            }
        </TextField>
    </Box>
}