import { Box, Grid, InputBase, TextField, Typography } from "@material-ui/core";
import { useMemo } from "react";
import { useFillable } from "../../state/selectors";
import { ColorPicker } from "material-ui-color";

export function FillableBranding() {
    const fillable = useFillable();

    const branding = useMemo(() => {
        return fillable.decoration.branding;
    }, []);

    return <Box>
        <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
            <Grid item xs={4}>
                <Typography variant="body2">Logo de l&apos;entreprise / du produit</Typography>
            </Grid>
            <Grid item xs={8}>
                <InputBase type="file"/>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body2">Titre de l&apos;entreprise / du produit</Typography>
            </Grid>
            <Grid item xs={8}>
                <TextField variant="outlined" size="small" fullWidth/>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body2">Slogan de l&apos;entreprise / du produit</Typography>
            </Grid>
            <Grid item xs={8}>
                <TextField variant="outlined" size="small" fullWidth/>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body2">Image / Couleur de l&apos;arrière plan du formulaire</Typography>
            </Grid>
            <Grid item xs={4}>
                <InputBase type="file"/>
            </Grid>
            <Grid item xs={4}>
                <ColorPicker defaultValue="#DDDDDD" onChange={(c) => {}} />
            </Grid>
        </Grid>
    </Box>
}