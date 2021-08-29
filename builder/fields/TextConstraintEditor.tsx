import { Grid, TextField } from "@material-ui/core";
import { ChangeEvent, useCallback } from "react";
import { FieldEditorProps } from ".";
import { TextConstraints } from "../../engine/fields";

export function TextConstraintsEditor(props: FieldEditorProps) {

    const onMaxCharChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let field: TextConstraints = {...props.field} as TextConstraints;
        field.max = ev.currentTarget.valueAsNumber;
        props.onChange(field);
    }, [props]);

    return <Grid container spacing={1}>
        <Grid item xs={12}>
            <TextField 
                label={`Nombre maximal de ${["short", "email"].includes(props.field.format) ? "caractères": "mots"}`} 
                size="small"
                variant="outlined" 
                fullWidth type="number"
                value={props.field.max}
                onChange={onMaxCharChange}/>
        </Grid>
    </Grid>
}