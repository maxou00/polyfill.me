import { Box, Chip, MenuItem, TextField, Typography } from "@material-ui/core";
import { useMemo } from "react";
import { FieldRendererProps } from ".";

export function ChipFieldRenderer(props: FieldRendererProps) {

    return <Box paddingY={1}>
        {
            props.question.options.map((o) => {
                return <Chip key={o.value} label={o.value} />
            })
        }
    </Box>
}