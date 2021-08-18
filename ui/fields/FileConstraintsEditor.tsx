import { Box, Checkbox, Chip, Grid, InputLabel, List, ListItem, ListItemText, ListSubheader, MenuItem, Select, TextField } from "@material-ui/core";
import { useMemo } from "react";
import { ChangeEvent, useCallback } from "react";
import { MdClose } from "react-icons/md";
import { FieldEditorProps } from ".";
import { FileField } from "../../engine/fields";

export function FileConstraintsEditor(props: FieldEditorProps) {

    const hasFormats = useMemo(() => {
        return Boolean(props.field.formats);
    }, [props]);

    const onMaxFileSizeChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let value = ev.currentTarget.valueAsNumber;
        if (value) {
            props.onChange({ ...props.field, maxSize: value });
        }
    }, [props]);

    const onAppendFileFormat = useCallback((format: string) => {
        let next = hasFormats ? [...props.field.formats] : [];
        if (!next.includes(format) || !next.includes("all")) {
            if (format === "all") {
                next = ["all"];
            }
            next.push(format);
            props.onChange({ ...props.field, formats: next });
        }
    }, [props, hasFormats]);

    const onDropFileFormat = useCallback((format: string) => {
        let next = hasFormats ? [...props.field.formats] : [];
        if (next.includes(format) || next.includes("all")) {
            next = next.filter((f) => f !== format && f !== "all");
            props.onChange({ ...props.field, formats: next });
        }
    }, [props, hasFormats]);

    return <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
                label="Taille maximale"
                fullWidth
                size="small"
                variant="outlined"
                type="number"
                onChange={onMaxFileSizeChange}
                value={props.field.maxSize}
                InputProps={{
                    endAdornment: "Mb"
                }} />
        </Grid>
        <Grid item xs={12}>
            <List dense disablePadding>
                <ListSubheader>Type de fichier</ListSubheader>
                {
                    ["audio", "video", "all"].map((f) => {
                        let checked = hasFormats && (props.field.formats.includes(f) || props.field.formats.includes("all"));

                        return <ListItem key={f}>
                            <Checkbox
                                checked={checked}
                                color="primary"
                                onChange={(ev, check) => !check ? onDropFileFormat(f) : onAppendFileFormat(f)} />
                            <ListItemText
                                primary={f} />
                        </ListItem>
                    })
                }
            </List>
        </Grid>
    </Grid>
}