import { Avatar, Box, Container, IconButton, Toolbar, Typography, useTheme } from "@material-ui/core";
import { blueGrey, grey } from "@material-ui/core/colors";
import shadows from "@material-ui/core/styles/shadows";
import { MdArrowUpward, MdKeyboardArrowUp } from "react-icons/md";
import { useCollectionForm, usePageNavigation } from "../state/selectors"
import { PageNavigation } from "./PageNavigation";
import { PageRenderer } from "./PageRenderer";
import { useFlow } from "./SingleFlowLayout";
import styles from "./styles/PageStack.module.scss";

export function PageHeader() {
    const brand = useCollectionForm().form_content.decoration.branding;
    const flow = useFlow();

    return <Toolbar className={styles.header}>
        <Box flexGrow={1} display="flex" flexDirection="row" alignItems="center">
            {brand && brand.brand.logo && <Avatar variant="rounded" src={brand.brand.logo} />}
            <Box marginX={2} flexGrow={1}>
                {brand && brand.brand.name && <Typography variant="h6" style={{ fontWeight: 600 }} className={styles.title}>{brand.brand.name}</Typography>}
            </Box>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
            <IconButton color="primary" onClick={flow.back} style={{ background: 'white' }}>
                <MdKeyboardArrowUp size={24} />
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
                    <Container>
                        <PageRenderer page={p} />
                    </Container>
                </div>
            })
        }
    </Box>
}