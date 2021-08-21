import { Box, Button, Grid, InputBase, TextField, Typography } from "@material-ui/core";
import { ChangeEvent, useMemo } from "react";
import { useFillable } from "../../state/selectors";
import { ColorPicker, Color } from "material-ui-color";
import { useCallback } from "react";
import { supaClient } from "../../core/utils";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { FillableBranding } from "../../engine/decoration";
import { useDispatch } from "react-redux";
import { updateDecoration } from "../../state/creator";

export function FillableBrandingView() {
    const fillable = useFillable();
    const dispatch = useDispatch();

    const branding = useMemo(() => {
        return fillable.decoration.branding;
    }, [fillable]);

    const onLogoChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let file = ev.target.files[0];
        let fid = 'forms/' + nanoid();
        toast("Televersement du logo en cours...");
        let current = branding.brand.logo;
        supaClient.storage.from("general").upload(fid, file)
            .then((value) => {
                if (value.error) {
                    toast.error(value.error.message);
                }
                else {
                    toast.success("televersé");
                    let nextBranding = { ...branding };
                    nextBranding.brand.logo = supaClient.storage.from("general").getPublicUrl(fid).publicURL;

                    let nextDeco = { ...fillable.decoration };
                    nextDeco.branding = nextBranding;
                    dispatch(updateDecoration(nextDeco));
                }

                if (current) {
                    supaClient.storage.from("general").remove([current])
                        .then((done) => { });
                }
            })
    }, [branding, fillable, dispatch]);

    const onResetLogo = useCallback(() => {
        let current = branding.brand.logo;
        let nextBranding = { ...branding };
        nextBranding.brand.logo = "";
        let nextDeco = { ...fillable.decoration };
        nextDeco.branding = nextBranding;
        dispatch(updateDecoration(nextDeco));
        if (current) {
            supaClient.storage.from("general").remove([current])
                .then((done) => { });
        }
        toast("Logo retiré");
    }, [branding, fillable, dispatch]);

    const onBackgroundChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let file = ev.target.files[0];
        let fid = 'forms/' + nanoid();
        toast("Televersement de l'arrière-plan en cours...");

        let current = branding.background.image;

        supaClient.storage.from("general").upload(fid, file)
            .then((value) => {
                if (value.error) {
                    toast.error(value.error.message);
                }
                else {
                    toast.success("televersé");
                    let nextBranding = { ...branding };
                    nextBranding.background.image = supaClient.storage.from("general").getPublicUrl(fid).publicURL;

                    let nextDeco = { ...fillable.decoration };
                    nextDeco.branding = nextBranding;
                    dispatch(updateDecoration(nextDeco));
                }

                if (current) {
                    supaClient.storage.from("general").remove([current])
                        .then((done) => { });
                }
            })
    }, [branding, fillable, dispatch]);

    const onResetBackground = useCallback(() => {
        let current = branding.background.image;
        let nextBranding = { ...branding };
        nextBranding.background.image = "";
        let nextDeco = { ...fillable.decoration };
        nextDeco.branding = nextBranding;
        dispatch(updateDecoration(nextDeco));
        if (current) {
            supaClient.storage.from("general").remove([current])
                .then((done) => { });
        }
        toast("Image d'arrière-plan retiré.");
    }, [branding, fillable, dispatch]);

    const onBrandNameChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let name = ev.target.value;
        let nextBranding: FillableBranding = { ...branding };
        nextBranding.brand.name = name;
        let nextDeco = { ...fillable.decoration };
        nextDeco.branding = nextBranding;
        dispatch(updateDecoration(nextDeco));
    }, [fillable, dispatch, branding]);

    const onSloganChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let name = ev.target.value;
        let nextBranding: FillableBranding = { ...branding };
        nextBranding.brand.subtitle = name;
        let nextDeco = { ...fillable.decoration };
        nextDeco.branding = nextBranding;
        dispatch(updateDecoration(nextDeco));
    }, [fillable, dispatch, branding]);

    const onDecorationColorChange = useCallback((color: Color) => {
        let nextBranding: FillableBranding = { ...branding };
        nextBranding.background.color = `#${color.hex}`;
        let nextDeco = { ...fillable.decoration };
        nextDeco.branding = nextBranding;
        dispatch(updateDecoration(nextDeco));
    }, [fillable, dispatch, branding]);

    if (!branding) {
        return <></>
    }

    return <Box>
        <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
            <Grid item xs={4}>
                <Typography variant="body2">Logo de l&apos;entreprise / du produit</Typography>
            </Grid>
            <Grid item xs={8}>
                <InputBase type="file" onChange={onLogoChange} />
            </Grid>
            <Grid item xs={12}>
                <Button
                    size="small"
                    variant="text"
                    color="secondary"
                    onClick={onResetLogo}>
                    Retirer le logo
                </Button>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body2">Titre de l&apos;entreprise / du produit</Typography>
            </Grid>
            <Grid item xs={8}>
                <TextField variant="outlined" size="small" value={branding.brand.name} onChange={onBrandNameChange} fullWidth />
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body2">Slogan de l&apos;entreprise / du produit</Typography>
            </Grid>
            <Grid item xs={8}>
                <TextField variant="outlined" size="small" value={branding.brand.subtitle} onChange={onSloganChange} fullWidth />
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body2">Image / Couleur de l&apos;arrière plan du formulaire</Typography>
            </Grid>
            <Grid item xs={4}>
                <InputBase type="file" onChange={onBackgroundChange} />
            </Grid>
            <Grid item xs={4}>
                <ColorPicker disableTextfield value={branding.background.color} onChange={onDecorationColorChange} />
            </Grid>
            <Grid item xs={12}>
                <Button
                    size="small"
                    variant="text"
                    color="secondary"
                    onClick={onResetBackground}>
                    Retirer l&apos;image d'arrière-plan
                </Button>
            </Grid>
        </Grid>
    </Box>
}