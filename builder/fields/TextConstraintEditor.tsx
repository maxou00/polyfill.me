import { Grid, TextField } from "@material-ui/core";
import { ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { FieldEditorProps } from ".";
import { ContentField, TextConstraints, TextField as ContentTextField } from "../../engine/fields";
import { appendField } from "../../state/creator";

export function TextConstraintsEditor(props: FieldEditorProps) {

    const onMaxCharChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let field: TextConstraints = {...props.field} as TextConstraints;
        field.maxChars = ev.currentTarget.valueAsNumber;

        props.onChange(field);
    }, [props]);

    return <Grid container spacing={1}>
        <Grid item xs={12}>
            <TextField 
                label="Nombre maximal de caractères" 
                size="small"
                variant="outlined" 
                fullWidth type="number"
                value={props.field.maxChars}
                onChange={onMaxCharChange}/>
        </Grid>
    </Grid>
}