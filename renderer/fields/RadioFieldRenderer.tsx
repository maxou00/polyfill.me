import { Box, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { useCallback } from "react";
import { FieldRendererProps } from ".";

export function RadioFieldRenderer(props: FieldRendererProps) {

    const onCheckChange = useCallback((value: string) => {
        props.onChange(value);
    }, [props]);

    return <Box paddingY={1}>
        <RadioGroup onChange={(ev,val) => onCheckChange(val)}>
            {
                props.question.options.map((o) => {
                    return <FormControlLabel key={o.value} label={o.value} value={o.value} control={<Radio color="primary" />} />
                })
            }
        </RadioGroup>
    </Box>
}