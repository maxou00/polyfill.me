import { Box, Button, ButtonGroup, Container, Dialog, DialogContent, Grid, Paper, Toolbar, Typography } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useCallback } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { supaClient } from "../core/utils";
import { DataForm, FormResponse } from "../engine/page";
import styles from "../styles/FormReport.module.scss";
import { NoTransformButton } from "../ui/styled";
import { SchemaTable } from "./SchemaTable";
import { useDataset } from "./helper";
import { SchemaRowsPaper } from "./SchemaRowsPaper";

const SchemaViewContext = createContext<ReturnType<typeof useDataset> & { form: DataForm } | undefined>(undefined);

export function useSchemaView() {
    return useContext(SchemaViewContext);
}

export function SchemaView(props: { form: DataForm }) {
    const responses = useDataset(props.form.id);
    const [isFullScreen, setFullScreen] = useState(false);

    const router = useRouter();

    const onPreview = useCallback(() => {
        window.open(`${router.basePath}/preview/${props.form.id}`, "_blank");
    }, [props, router]);

    return <SchemaViewContext.Provider value={{
        ...responses,
        form: props.form
    }}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box className={styles.formMetaHeader}>
                    <div className={styles.background}></div>
                    <Paper className={styles.meta}>
                        <div className={styles.header}>
                            <Box flexGrow={1}>
                                <Typography variant="h5" className={styles.title}>{props.form.form_content.title}</Typography>
                            </Box>
                            <Box>
                                <NoTransformButton onClick={onPreview} variant="outlined" color='primary' size="small" endIcon={<i className="fi-rr-link" style={{fontSize: '14px'}}></i>}>Preview</NoTransformButton>
                            </Box>
                        </div>
                        <Box>
                            <Typography variant="body2" className={styles.subtitle}>{props.form.form_content.subtitle}</Typography>
                        </Box>
                    </Paper>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={2}>
                    <Box paddingBottom={1} display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
                        <NoTransformButton size="small" variant="contained" disableElevation color="primary" onClick={() => setFullScreen(true)}>
                            <i className="fi-rr-zoom-in" style={{ fontSize: '16px' }}></i>
                        </NoTransformButton>
                    </Box>
                    <SchemaRowsPaper />
                </Paper>
            </Grid>
            <Dialog fullScreen open={isFullScreen}>
                <Box padding={1} display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
                    <NoTransformButton size="small" onClick={() => setFullScreen(false)} variant="outlined" disableElevation color="default">
                        <i className="fi-rr-zoom-out" style={{ fontSize: '16px' }}></i>
                    </NoTransformButton>
                </Box>
                <DialogContent>
                    <SchemaRowsPaper />
                </DialogContent>
            </Dialog>
        </Grid>
    </SchemaViewContext.Provider>
}