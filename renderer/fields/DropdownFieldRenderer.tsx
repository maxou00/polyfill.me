import { Box, MenuItem, TextField, Typography } from "@material-ui/core";
import { useCallback, useMemo } from "react";
import { FieldRendererProps } from ".";

export function DropdownFieldRenderer(props: FieldRendererProps) {

    const answer = useMemo(() => {
        if (props.response.answer) {
            return props.response.answer;
        }
        return "";
    }, [props.response.answer]);

    const onSelect = useCallback((value: string) => {
        props.onChange(value);
    }, [props]);

    return <Box paddingY={1}>
        <TextField
            fullWidth
            select
            value={answer}
            size="small"
            variant="outlined"
            placeholder={props.question.title}
            onChange={(ev) => onSelect(ev.target.value)}
            error={props.errors}>
            {
                props.question.options.map((o) => {
                    return <MenuItem dense key={o.value} value={o.value}>{o.value}</MenuItem>
                })
            }
        </TextField>
    </Box>
}