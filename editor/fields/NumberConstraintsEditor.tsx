import { Box, Grid, InputLabel, TextField } from "@material-ui/core";
import { ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { FieldEditorProps } from ".";
import { ContentField, DateConstraints, NumberConstraints, TimeConstraints } from "../../engine/fields";
import { timeUtils } from "../../engine/helpers";
import { appendField } from "../../state/creator";

function RawNumberConstraints(props: FieldEditorProps) {
    const onMaxChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let field: NumberConstraints = { ...props.field } as NumberConstraints;
        field.max = ev.currentTarget.valueAsNumber;
        props.onChange(field);
    }, [props]);

    const onMinChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let field: NumberConstraints = { ...props.field } as NumberConstraints;
        field.min = ev.currentTarget.valueAsNumber;
        props.onChange(field);
    }, [props]);

    return <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
                type="number"
                size="small"
                variant="outlined"
                fullWidth
                label="Valeur minimale"
                value={props.field.min}
                onChange={onMinChange} />
        </Grid>
        <Grid item xs={12}>
            <TextField
                type="number"
                size="small"
                variant="outlined"
                fullWidth
                label="Valeur maximale"
                value={props.field.max}
                onChange={onMaxChange} />
        </Grid>
    </Grid>
}

export function NumberConstraintsEditor(props: FieldEditorProps) {

    if (props.field.type === "number" && (props.field.format === "date" || props.field.format === "datetime")) {
        return <DateConstraintsEditor {...props} />
    }
    else if (props.field.type === "number" && (props.field.format === "time")) {
        return <TimeConstraintsEditor {...props} />
    }
    return <RawNumberConstraints {...props}/>
}

export function DateConstraintsEditor(props: FieldEditorProps) {

    const onMaxChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let field: DateConstraints = { ...props.field } as DateConstraints;
        let date = ev.currentTarget.value;
        if (date) {
            field.max = Date.parse(date);
        }
        else {
            field.max = undefined;
        }
        props.onChange(field);
    }, [props]);

    const onMinChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let field: DateConstraints = { ...props.field } as DateConstraints;
        let date = ev.currentTarget.value;
        if (date) {
            field.min = Date.parse(date);
        }
        else {
            field.min = undefined;
        }
        props.onChange(field);
    }, [props]);

    return <Grid container spacing={2}>
        <Grid item xs={12}>
            <Box paddingY={1}>
                <InputLabel>Date minimale</InputLabel>
            </Box>
            <TextField
                type="date"
                size="small"
                variant="outlined"
                fullWidth
                onChange={onMinChange}
                value={props.field.min ? (timeUtils.dateInEnCA(new Date(props.field.min))) : undefined} />
        </Grid>
        <Grid item xs={12}>
            <Box paddingY={1}>
                <InputLabel>Date maximale</InputLabel>
            </Box>
            <TextField
                type="date"
                size="small"
                variant="outlined"
                fullWidth
                onChange={onMaxChange}
                value={props.field.max ? (timeUtils.dateInEnCA(new Date(props.field.max))) : undefined} />
        </Grid>
    </Grid>
}

export function TimeConstraintsEditor(props: FieldEditorProps) {

    const onMaxChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let field: TimeConstraints = { ...props.field } as TimeConstraints;
        field.max = timeUtils.toInt(ev.currentTarget.value);
        props.onChange(field);
    }, [props]);

    const onMinChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let field: TimeConstraints = { ...props.field } as TimeConstraints;
        field.min = timeUtils.toInt(ev.currentTarget.value);
        props.onChange(field);
    }, [props]);

    return <Grid container spacing={2}>
        <Grid item xs={12}>
            <Box paddingY={1}>
                <InputLabel>Heure minimale</InputLabel>
            </Box>
            <TextField
                type="time"
                size="small"
                variant="outlined"
                fullWidth
                value={timeUtils.asString(props.field.min)}
                onChange={onMinChange} />
        </Grid>
        <Grid item xs={12}>
            <Box paddingY={1}>
                <InputLabel>Heure maximale</InputLabel>
            </Box>
            <TextField
                type="time"
                size="small"
                variant="outlined"
                fullWidth
                value={timeUtils.asString(props.field.max)}
                onChange={onMaxChange} />
        </Grid>
    </Grid>
}
