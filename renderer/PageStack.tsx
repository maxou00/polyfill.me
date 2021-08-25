import { Avatar, Box, IconButton, Toolbar, Typography } from "@material-ui/core";
import { blueGrey, grey } from "@material-ui/core/colors";
import shadows from "@material-ui/core/styles/shadows";
import { MdArrowUpward } from "react-icons/md";
import { useCollectionForm, usePageNavigation } from "../state/selectors"
import { PageRenderer } from "./PageRenderer";
import { useFlow } from "./SingleFlowLayout";
import styles from "./styles/PageStack.module.scss";

export function PageHeader() {
    const brand = useCollectionForm().form_content.decoration.branding;
    const flow = useFlow();

    return <Toolbar className={styles.header}>
        <Box display="flex" flexDirection="row" alignItems="center">
            {brand && brand.brand.logo && <Avatar src={brand.brand.logo} />}
            <Box marginX={2}>
                {brand && brand.brand.name && <Typography variant="h6" style={{fontWeight: 600}}>{brand.brand.name}</Typography>}
                {brand && brand.brand.subtitle && <Typography variant="body2" style={{color: grey[500]}}>{brand.brand.subtitle}</Typography>}
            </Box>
        </Box>
        <Box>
            <IconButton size="small" onClick={flow.back} style={{ background: 'white' }}>
                <MdArrowUpward size={18} color={blueGrey[900]} />
            </IconButton>
        </Box>
    </Toolbar>
}


export function PageStack() {
    const pages = useCollectionForm().form_content.pages;
    const { hasBefore, hasNext, activeIndex } = usePageNavigation();

    return <Box className={styles.stack}>
        {
            pages.map((p, i) => {
                let position = 'center';
                if (i < activeIndex) position = 'left';
                else if (i > activeIndex) position = 'right';

                return <div className={styles.node} data-placement={position} key={p.key}>
                    <PageRenderer page={p} />
                </div>
            })
        }
    </Box>
}