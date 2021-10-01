import { Box, Button, ButtonGroup, Container, Dialog, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, Paper, Switch, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useCallback, useMemo } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getBaseUrl, supaClient } from "../core/utils";
import { DataForm, FormResponse } from "../engine/page";
import styles from "../styles/FormReport.module.scss";
import { NoTransformButton } from "../ui/styled";
import { SchemaTable } from "./SchemaTable";
import { useDataset } from "./helper";
import { SchemaRowsPaper } from "./SchemaRowsPaper";
import { toast } from "react-toastify";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { fetchForms } from "../state/middlewares";
import { MdClose, MdExpandMore, MdFullscreen, MdFullscreenExit, MdZoomIn } from "react-icons/md";
import { useGlobalState } from "../state/selectors";
import { FilterView } from "./FilterView";
import { FilterComposer } from "./FilterComposer";

const SchemaViewContext = createContext<ReturnType<typeof useDataset> & { form: DataForm } | undefined>(undefined);

export function useSchemaView() {
    return useContext(SchemaViewContext);
}

export function SchemaView(props: { form: DataForm }) {
    const [filterOpen, setFilterOpen] = useState(false);
    const responses = useDataset(props.form.id);
    const [isFullScreen, setFullScreen] = useState(false);

    const dispatch = useDispatch();
    const globalState = useGlobalState();
    const filters = useMemo(() => {
        return (globalState.filters || []).filter((f) => f.schemaId === props.form.id);
    }, [globalState.filters, props.form.id]);

    const router = useRouter();
    const onPreview = useCallback(() => {
        window.open(`${router.basePath}/preview/${props.form.id}`, "_blank");
    }, [props, router]);

    const onAnonymousFillChange = useCallback((check: boolean) => {
        toast.info("En cours...")
        supaClient.from<DataForm>("forms").update({
            allow_anonymous: Boolean(check)
        }).eq("id", props.form.id)
            .then((value) => {
                if (value.data) {
                    if (check) {
                        toast.success("Remplissage anonyme activé")
                    }
                    else {
                        toast.success("Remplissage anonyme désactivé.")
                    }
                    dispatch(fetchForms());
                }
            })
    }, [props.form, dispatch]);

    const onCopyLink = useCallback(async () => {
        navigator.clipboard.writeText(`${getBaseUrl()}/fill/${props.form.id}`);
        toast.info("Copié");
    }, [props.form]);

    return <SchemaViewContext.Provider value={{
        ...responses,
        form: props.form
    }}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Container>
                    <Box className={styles.formMetaHeader}>
                        <div className={styles.background}></div>
                        <Paper className={styles.meta}>
                            <div className={styles.header}>
                                <Box flexGrow={1}>
                                    <Typography variant="h5" className={styles.title}>{props.form.form_content.title}</Typography>
                                </Box>
                                <Box>
                                    <NoTransformButton onClick={onPreview} variant="outlined" color='primary' size="small" endIcon={<i className="fi-rr-link" style={{ fontSize: '14px' }}></i>}>Preview</NoTransformButton>
                                </Box>
                            </div>
                            <Box>
                                <Typography variant="body2" className={styles.subtitle}>{props.form.form_content.subtitle}</Typography>
                            </Box>
                            <Box marginY={2} display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
                                <Box>
                                    <Tooltip title={
                                        <span style={{ fontSize: '14px' }}>Le remplissage anonyme permets à n&apos;importe qui ayant accès au lien de ce schéma d&apos;ajouter une donnée. Utile pour les sondages et autres collectes d&apos;informations</span>
                                    }>
                                        <FormControlLabel
                                            label="Remplissage anonyme"
                                            checked={props.form.allow_anonymous}
                                            onChange={(ev, check) => onAnonymousFillChange(check)}
                                            control={<Switch color="primary" />} />
                                    </Tooltip>
                                </Box>
                                {props.form.allow_anonymous && <NoTransformButton variant="outlined" color="default" size="small" onClick={onCopyLink}>
                                    Copier le lien de réponse
                                </NoTransformButton>}
                            </Box>
                        </Paper>
                    </Box>
                </Container>
            </Grid>
            <Grid item xs={12}>
                {
                    filters.map((filter) => {
                        return <Paper key={filter.id}>
                            <FilterView schema={props.form} filter={filter} />
                        </Paper>
                    })
                }
            </Grid>
            <Grid item xs={12}>
                <Box paddingY={2}>
                    <NoTransformButton onClick={() => setFilterOpen(true)} variant="contained" color="primary">Créer un nouveau filtre</NoTransformButton>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={2}>
                    <Box paddingBottom={1} display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
                        <IconButton onClick={() => setFullScreen(true)}>
                            <MdFullscreen size={24} />
                        </IconButton>
                    </Box>
                    <SchemaRowsPaper />
                </Paper>
            </Grid>
            <Dialog fullScreen open={isFullScreen}>
                <Box padding={1} display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
                    <IconButton onClick={() => setFullScreen(false)}>
                        <MdFullscreenExit size={24} />
                    </IconButton>
                </Box>
                <DialogContent>
                    <SchemaRowsPaper />
                </DialogContent>
            </Dialog>
            <Dialog open={filterOpen} onClose={() => setFilterOpen(false)} fullScreen>
                <DialogTitle>
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                        <Box paddingY={2}>
                            <Typography variant="h6">Composer un filtre</Typography>
                        </Box>
                        <IconButton onClick={() => setFilterOpen(false)}>
                            <MdClose />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Container>
                        <FilterComposer schema={props.form} />
                    </Container>
                </DialogContent>
            </Dialog>
        </Grid>
    </SchemaViewContext.Provider>
}