import { Box, TextField, Typography } from "@material-ui/core";
import { useCallback, useMemo } from "react";
import { FieldRendererProps } from ".";

export function DateFieldRenderer(props: FieldRendererProps) {

    const value = useMemo(() => {
        return new Intl.DateTimeFormat("en-CA").format(Date.parse(props.response.answer))
    }, [props.response]);

    const onChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        let value = ev.target.valueAsDate.toISOString();
        alert(value);
        alert(new Date( Date.parse(value) ))
        props.onChange(value);
    },[props]);

    return <Box paddingY={1}>
        <TextField
            fullWidth
            size="small"
            type={props.question.format === "datetime-local" ? "datetime-local" : "date"}
            variant="outlined"
            value={value}
            onChange={onChange}
            placeholder={props.question.title} />
    </Box>
}