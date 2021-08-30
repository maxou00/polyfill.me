import { Box, Chip, Typography } from "@material-ui/core";
import { useMemo } from "react";
import { useCollectionForm } from "../state/selectors";
import { Branding } from "./Branding";
import { useRenderingMode } from "./FormRenderer";
import styles from "./styles/Meta.module.scss";

export function Meta() {
    const form = useCollectionForm();
    const {mode} = useRenderingMode();
    const deco = useMemo(() => {
        return form.form_content.decoration
    }, [form]);

    return <Box padding={2} className={styles.meta}>
        {mode === "preview" && <Chip label="Démo" color="default"/>}
        <Branding/>
        <Box paddingY={.5}>
            <Typography variant="h4" className={styles.title} style={{color: deco.palette.fillable.title}}>{form.form_content.title}</Typography>
            <Typography variant="body1" className={styles.subtitle} style={{color: deco.palette.fillable.subtitle}}>{form.form_content.subtitle}</Typography>
        </Box>
    </Box>
}