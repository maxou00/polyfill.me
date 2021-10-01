import { Box, Grid, TextField } from "@material-ui/core";
import { nanoid } from "nanoid";
import { ChangeEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { supaClient } from "../core/utils";
import { DataForm } from "../engine/page";
import { appendFilter } from "../state/creator";
import { NoTransformButton } from "../ui/styled";
import { DataFormFilter, FilterChain } from "./filtering";

interface Props {
    schema: DataForm,
    filter: FilterChain,
    onSaved(template: DataFormFilter): any
}

export function SaveFilter(props: Props) {
    const [errors, setErrors] = useState<any>({});
    const [busy, setBusy] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = useCallback((ev: ChangeEvent<HTMLFormElement>) => {
        ev.preventDefault();

        let data = {
            label: ev.currentTarget.filterLabel.value,
            code: ev.currentTarget.filterCode.value || nanoid(8)
        };

        let errs: any = {};

        if(!data.label) {
            errs.label = "Vous devez indiquer un nom à ce filtre";
        }
        setErrors(errs);
        if(Object.keys(errs).length > 0) {
            return;
        }

        setBusy(true);
        supaClient.from<DataFormFilter>("filters")
        .insert({
            id: nanoid(),
            label: data.label,
            code: data.code,
            filter: props.filter,
            user_id: supaClient.auth.session().user.id,
            schemaId: props.schema.id
        })
        .then( async (result) => {
            setBusy(false);
            if(result.error) {
                if(result.error.message.includes("JWT")) {
                    await supaClient.auth.refreshSession();
                }
                toast.error(result.error.message);
                //if(result.)
            }
            else {
                toast.success("Modèle enregistré");
                /// append filter to dataset.
                dispatch(appendFilter(result.data[0]));
                props.onSaved(result.data[0]);
            }
        })
    }, [props, dispatch]);

    return <Box>
        <Grid component="form" onSubmit={onSubmit} container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    name="filterLabel"
                    required
                    label="Titre à afficher pour ce filtre"
                    helperText="Ce nom sera utilisé pour afficher comme titre pour ce label sur les interfaces"
                    error={errors.label}/>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    name="filterCode"
                    required
                    defaultValue={nanoid(8)}
                    label="Code du filtre"
                    helperText="Vous utiliserez ce code pour identifier le filtre dans vos systèmes lorsque vous voulez vous en servir."
                    error={errors.code}/>
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
                    <NoTransformButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={busy}>Enregistrer</NoTransformButton>
                </Box>
            </Grid>
        </Grid>
    </Box>
}