import { Box, Container, Typography } from "@material-ui/core";
import { useMemo } from "react";
import { useCollectionForm } from "../state/selectors";
import { Branding } from "./Branding";
import styles from "./styles/Meta.module.scss";

export function Meta() {
    const form = useCollectionForm();
    const deco = useMemo(() => {
        return form.form_content.decoration
    }, [form]);

    return <Box style={{width: 'min(100%, 560px)'}}>
        <Branding/>
        <Box paddingY={4}>
            <Typography variant="h4" className={styles.title} style={{color: deco.palette.fillable.title}}>{form.form_content.title}</Typography>
            <Typography variant="body1" className={styles.subtitle} style={{color: deco.palette.fillable.subtitle}}>{form.form_content.subtitle}</Typography>
        </Box>
    </Box>
}