import { Box, Chip, MenuItem, TextField, Typography } from "@material-ui/core";
import { useCallback } from "react";
import { useMemo } from "react";
import { FieldRendererProps } from ".";
import { ChipField, SelectField } from "../../engine/fields";

export function ChipFieldRenderer(props: FieldRendererProps<ChipField>) {

    const onChipClicked = useCallback((value: string) => {
        /// handle click by either adding the value to answers or removing it.
        if(props.question.selection === "single") {
            props.onChange(value);
        }
        else if(props.question.selection === "multiple") {
            let answer: Array<string> = props.response.answer || [];
            if(!answer.includes(value)) {
                answer.push(value);
            }
            props.onChange(answer);
        }
    }, [props]);

    const onChipUnselected = useCallback((value: string) => {
        /// handle click by either adding the value to answers or removing it.
        if(props.question.selection === "single") {
            props.onChange(undefined);
        }
        else if(props.question.selection === "multiple") {
            let answer: Array<string> = props.response.answer || [];
            if(answer.includes(value)) {
                answer = answer.filter((v) => v !== value);
            }
            props.onChange(answer);
        }
    }, [props]);
    
    return <Box paddingY={1}>
        {
            props.question.options.map((o) => {
                let isActive = false;
                if(props.response.answer) {
                    if(props.question.selection === "single") {
                        isActive =  props.response.answer === o.value;
                    }
                    else {
                        isActive = props.response.answer.includes(o.value);
                    }
                }

                return <Chip 
                    key={o.value} 
                    color={isActive ? "primary" : "default"} 
                    label={o.value} 
                    clickable
                    onDelete={isActive ? () => onChipUnselected(o.value) : undefined}
                    onClick={() => onChipClicked(o.value)}
                    style={{margin: '4px'}} />
            })
        }
    </Box>
}