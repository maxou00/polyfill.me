import { Box, TextField, Typography } from "@material-ui/core";
import { useCallback, useMemo } from "react";
import { FieldRendererProps } from ".";

export function NumberFieldRenderer(props: FieldRendererProps) {

    const onChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        let value = ev.target.valueAsNumber;
        props.onChange(value);
    },[props]);

    return <Box paddingY={1}>
        <TextField
            fullWidth
            size="small"
            type="number"
            value={props.response.answer}
            onChange={onChange}
            variant="outlined"
            placeholder={props.question.title}
            error={props.errors}/>
    </Box>
}