import { Box, Grid, MenuItem, TextField, Typography } from "@material-ui/core";
import { User } from "@supabase/gotrue-js";
import { ChangeEvent, useCallback, useState } from "react";
import { MdDone } from "react-icons/md";
import { toast } from "react-toastify";
import { supaClient } from "../core/utils";
import { useInit } from "./Initializer";
import { NoTransformButton } from "./styled";

interface Props {
    onSetupComplete(user: User): any;
}

export function SetupProfile(props: Props) {
    const { user } = useInit();
    const [errors, setErrors] = useState<any>({});
    const [busy, setBusy] = useState(false);

    const onSubmit = useCallback((ev: ChangeEvent<HTMLFormElement>) => {
        ev.preventDefault();
        let data = {
            name: ev.currentTarget.username.value,
            organization: ev.currentTarget.organization.value
        }

        let errs: any = {}
        if (!data.name) {
            errs.name = "Indiquez votre nom s'il vous plait.";
        }

        setErrors(errs);
        if (Object.keys(errs).length > 0) {
            return;
        }

        user.user_metadata.name = data.name;
        user.user_metadata.organization = data.organization;

        setBusy(true);
        supaClient.auth.update({
            data: {
                name: data.name,
                organization: data.organization
            }
        })
        .then((result) => {
            setBusy(false);
            if(result.data) {
                toast.success("C'est parfait !");
                props.onSetupComplete(result.data);
            }
            else {
                toast.error(result.error.message);
            }
        })
    }, [props, user.user_metadata]);

    return <Grid component="form" onSubmit={onSubmit} container spacing={2}>
        <Grid item xs={12}>
            <TextField
                name="username"
                variant="outlined"
                fullWidth
                label="Nom complet *"
                size="small"
                defaultValue={user.user_metadata.name}
                helperText={errors.name}
                error={errors.name}/>
        </Grid>
        <Grid item xs={12}>
            <TextField
                name="organization"
                variant="outlined"
                fullWidth
                label="Nom de votre entreprise ou organisation"
                size="small"
                defaultValue={user.user_metadata.name}
                helperText={errors.organization}
                error={errors.organization}/>
        </Grid>
        <Grid item xs={12}>
            <Box width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
                <NoTransformButton type="submit" variant="outlined" color="default" endIcon={<MdDone />} disabled={busy}>Continuer</NoTransformButton>
            </Box>
        </Grid>
    </Grid>
}