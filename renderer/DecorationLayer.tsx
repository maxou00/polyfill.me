import { Box, BoxProps } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { useMemo } from "react";
import { PropsWithChildren } from "react";
import { useCollectionForm } from "../state/selectors";

export function DecorationLayer(props: PropsWithChildren<BoxProps>) {
    const decoration = useCollectionForm().form_content.decoration;

    const hasImageBg = useMemo(() => {
        let bg = decoration.branding.background;
        return Boolean(bg.image);
    }, [decoration]);

    const styles: CSSProperties = useMemo(() => {
        let bg = decoration.branding.background;
        return {
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            background: bg.image ? `0% 0%/cover no-repeat fixed url(${bg.image})` : bg.color
        }
    }, [decoration]);

    return <Box style={styles} {...props}>
        {props.children}
    </Box >
}