import { Box, TextField, Typography } from "@material-ui/core";
import { useCallback, useMemo } from "react";
import { FieldRendererProps } from ".";
import { DateField, DateTimeField } from "../../engine/fields";

export function DateFieldRenderer(props: FieldRendererProps<DateField | DateTimeField>) {

    const value = useMemo(() => {
        if(props.response.answer) {
            return new Intl.DateTimeFormat("en-CA").format(Date.parse(props.response.answer))
        }
    }, [props.response]);

    const onChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        let value = ev.target.valueAsDate.toISOString();
        props.onChange(value);
    },[props]);

    return <Box paddingY={1}>
        <TextField
            fullWidth
            size="small"
            type={props.question.format === "datetime" ? "datetime-local" : "date"}
            variant="outlined"
            value={value}
            onChange={onChange}
            placeholder={props.question.title}
            error={props.errors}/>
    </Box>
}