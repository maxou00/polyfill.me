import { Avatar, Box, Typography } from "@material-ui/core";
import { useMemo } from "react";
import { supaClient } from "../core/utils";
import { useCollectionForm } from "../state/selectors";
import styles from "./styles/Brand.module.scss";

export function Branding() {
    const form = useCollectionForm();

    const deco = useMemo(() => {
        return form.form_content.decoration;
    }, [form]);

    const branding = useMemo(() => {
        return form.form_content.decoration.branding;
    }, [form]);

    const logoUrl = useMemo(() => {
        return branding.brand.logo
    },[branding]);

    if(!branding || !branding.brand) {
        return <></>
    }

    return <Box className={styles.brand}>
        { branding.brand.logo && <Avatar className={styles.avatar}  alt="brand logo" src={logoUrl}/> }
        <Box className={styles.content}>
            <Typography variant="h4" style={{color: deco.palette.fillable.title}}>{branding.brand.name}</Typography>
            <Typography variant="body2" style={{color: deco.palette.fillable.subtitle}}>{branding.brand.subtitle}</Typography>
        </Box>
    </Box>
}