import { Box, Chip, MenuItem, TextField, Typography } from "@material-ui/core";
import { useCallback } from "react";
import { useMemo } from "react";
import { FieldRendererProps } from ".";
import { ChipField, SelectField } from "../../engine/fields";

export function ChipFieldRenderer(props: FieldRendererProps<ChipField>) {

    const onChipClicked = useCallback((value: string) => {
        /// handle click by either adding the value to answers or removing it.
    }, []);
    
    return <Box paddingY={1}>
        {
            props.question.options.map((o) => {
                let isActive = false;
                if(props.response.answer) {
                    isActive =  props.response.answer.length ? props.response.answer.includes(o.value) : props.response.answer === o.value;
                }
                return <Chip 
                    key={o.value} 
                    color={isActive ? "primary" : "default"} 
                    label={o.value} 
                    style={{margin: '4px'}} />
            })
        }
    </Box>
}