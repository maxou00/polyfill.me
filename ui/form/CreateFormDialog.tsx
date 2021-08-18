import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton, Box, DialogProps, TextField, Grid, Button, MenuItem } from "@material-ui/core";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useCallback } from "react";
import { MdClose } from "react-icons/md";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";
import { supaClient } from "../../core/utils";
import { DataForm, Fillable, initialPage } from "../../engine/page";

interface Props extends DialogProps {
    onFormCreated(): any;
}

export function CreateFormDialog(props: Props) {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [lang, setLang] = useState("fr");

    const [loading, setLoading] = useState(false);

    const onReset = useCallback(() => {
        setTitle("");
        setSubtitle("");
        setLang("fr");
    }, []);

    const handleClose = useCallback(() => {
        if (props.onClose) {
            props.onClose({}, "backdropClick");
        }
    }, [props]);

    const onSubmit = useCallback(() => {
        const fillable: Fillable = {
            id: nanoid(),
            title,
            subtitle,
            locale: lang,
            pages: [initialPage()],
            createdAt: Date.now(),
        }

        setLoading(true);
        supaClient.from<DataForm>("forms")
            .insert({
                id: fillable.id,
                form_content: fillable
            })
            .single()
            .then((value) => {
                setLoading(false);
                if (value.body) {
                    toast.success("Nouveau formulaire créé. Editez-le maintenant !");
                    props.onFormCreated();
                }
            })
    }, [title, subtitle, lang, props]);

    return <Dialog {...props}>
        <DialogTitle>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">Nouvelle collecte</Typography>
                <IconButton onClick={handleClose}>
                    <MdClose size={18} />
                </IconButton>
            </Box>
        </DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                {loading && <Grid item xs={12}>
                    <Box padding={2} display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                        <PropagateLoader color="#999" size={10} />
                    </Box>
                </Grid>}
                <Grid item xs={12}>
                    <TextField
                        size="small"
                        variant="outlined"
                        fullWidth
                        label="Titre du formulaire"
                        value={title}
                        onChange={(ev) => setTitle(ev.currentTarget.value)} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        size="small"
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={2}
                        maxRows={10}
                        label="Décrivez votre formulaire à vos sujets."
                        value={subtitle}
                        onChange={(ev) => setSubtitle(ev.currentTarget.value)} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        select
                        size="small"
                        variant="outlined"
                        fullWidth
                        label="Langage"
                        value={lang}
                        onChange={(ev) => setLang(ev.target.value)}>
                        <MenuItem value="fr">Français</MenuItem>
                        <MenuItem value="en">Anglais</MenuItem>
                        <MenuItem value="es">Espagnol</MenuItem>
                    </TextField>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button disabled={loading} onClick={onSubmit} variant="contained" color="primary">C&apos;est parti !</Button>
        </DialogActions>
    </Dialog>
}