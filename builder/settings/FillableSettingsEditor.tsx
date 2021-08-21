import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Divider, Grid, MenuItem, Tab, Tabs, TextField, Typography } from "@material-ui/core";
import { FocusEvent } from "react";
import { useState, useCallback, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { updateFillable } from "../../state/creator";
import { useFillable } from "../../state/selectors";
import { FillableBrandingView } from "./FillableBranding";
import { FillablePalette } from "./FillablePalette";

interface Props extends DialogProps { }

export function FillableSettingsEditor(props: Props) {
    const [tab, setTab] = useState("general");

    const handleClose = useCallback(() => {
        if (props.onClose) {
            props.onClose({}, "backdropClick");
        }
    }, [props]);

    return <Dialog {...props}>
        <DialogTitle>
            Paramètres du formulaire
        </DialogTitle>
        <DialogContent dividers>
            <Box>
                <Container>
                    <Tabs value={tab} onChange={(ev, t) => setTab(t)} variant="fullWidth">
                        <Tab value="general" label="Général" />
                        <Tab value="styles" label="Theme & Décoration" />
                    </Tabs>
                    <Box paddingY={2} height="80vh">
                        {tab === "general" && <GeneralSettings />}
                        {tab === "styles" && <FillableDecoration />}
                    </Box>
                </Container>
            </Box>
        </DialogContent>
        <DialogActions>
            <Box paddingX={2} display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
                <Button variant="contained" color="primary" size="small" onClick={handleClose}>Fermer</Button>
            </Box>
        </DialogActions>
    </Dialog>
}

function GeneralSettings() {
    const fillable = useFillable();
    const dispatch = useDispatch();

    const onTitleChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let next = { ...fillable };
        next.title = ev.target.value;
        dispatch(updateFillable(next));
    }, [dispatch, fillable]);

    const onSubtitleChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let next = { ...fillable };
        next.subtitle = ev.target.value;
        dispatch(updateFillable(next));
    }, [dispatch, fillable]);

    const onLocaleChange = useCallback((locale: string) => {
        let next = { ...fillable };
        next.locale = locale;
        dispatch(updateFillable(next));
    }, [dispatch, fillable]);

    return <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography variant="h6">Titre du polyfill</Typography>
        </Grid>
        <Grid item xs={12}>
            <TextField
                variant="outlined"
                size="small"
                fullWidth
                value={fillable.title}
                onChange={onTitleChange} />
        </Grid>
        <Grid item xs={12}>
            <Typography variant="h6">Description du formulaire</Typography>
        </Grid>
        <Grid item xs={12}>
            <TextField
                variant="outlined"
                fullWidth
                multiline
                minRows={6}
                maxRows={20}
                size="small"
                value={fillable.subtitle}
                onChange={onSubtitleChange} />
        </Grid>
        <Grid item xs={12}>
            <Typography variant="h6">Quelle est la langue du formulaire ?</Typography>
        </Grid>
        <Grid item xs={12}>
            <TextField
                variant="outlined"
                fullWidth
                select
                size="small"
                value={fillable.locale}
                onChange={(ev) => onLocaleChange(ev.target.value)}>
                <MenuItem value="fr">Français</MenuItem>
                <MenuItem value="en">Anglais</MenuItem>
            </TextField>
        </Grid>
    </Grid>
}

function FillableDecoration() {
    return <Box>
        <Box padding={2}>
            <Typography variant="h6">Branding</Typography>
            <Box padding={2}>
                <FillableBrandingView />
            </Box>
        </Box>
        <Divider />
        <Box padding={2}>
            <Typography variant="h6">Palette de couleurs</Typography>
            <Box padding={2}>
                <FillablePalette />
            </Box>
        </Box>
    </Box>
}