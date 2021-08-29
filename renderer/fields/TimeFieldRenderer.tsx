import { Box, TextField, Typography } from "@material-ui/core";
import { ChangeEvent, useCallback, useMemo } from "react";
import { FieldRendererProps } from ".";

export function TimeFieldRenderer(props: FieldRendererProps) {

    const onTimeChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let value = ev.target.value;
        props.onChange(value);
    }, [props]);

    return <Box paddingY={1}>
        <TextField
            fullWidth
            size="small"
            type="time"
            value={props.response.answer}
            variant="outlined"
            placeholder={props.question.title}
            onChange={onTimeChange}
            error={props.errors}/>
    </Box>
}