import { Box, Checkbox, Typography } from "@material-ui/core";
import { useCallback } from "react";
import { FieldEditorProps } from ".";

export function CommonFieldConstraints(props: FieldEditorProps) {
    
    const onRequired = useCallback((require: boolean) => {
        props.onChange({...props.field, required: require});
    }, [props]);

    return <Box 
        width="100%" 
        display="flex" 
        flexDirection="row" 
        alignItems="center" 
        justifyContent="flex-end">
        <Typography variant="body2">Réponse obligatoire</Typography>
        <Checkbox color="primary" checked={props.field.required} onChange={(ev,checked) => onRequired(checked)}/>
    </Box>
}