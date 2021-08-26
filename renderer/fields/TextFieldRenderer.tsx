import { Box, TextField, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import { useMemo } from "react";
import { FieldRendererProps } from ".";

export function TextFieldRenderer(props: FieldRendererProps) {

    const fieldType = useMemo(() => {
        if (props.question.format === "email") {
            return "email";
        }
        return "text";
    }, [props.question]);

    const isMultiline = useMemo(() => {
        return props.question.format==="paragraph"
    }, [props.question]);

    const onChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        let value = ev.target.value;
        props.onChange(value);
    },[props]);

    return <Box paddingY={1}>
        <TextField
            fullWidth
            size="small"
            type={fieldType}
            variant="outlined"
            value={props.response.answer}
            multiline={isMultiline}
            placeholder={props.question.title}
            onChange={onChange}/>
    </Box>
}