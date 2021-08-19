import { Box, Button, Container, Paper, Typography } from "@material-ui/core";
import { useMemo, useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { DataForm } from "../engine/page";
import { useCollectionForm } from "../state/selectors";
import { PageRenderer } from "./PageRenderer";

export function FormRenderer() {

    const collectionForm = useCollectionForm();

    const [activeIndex, setActiveIndex] = useState(0);

    const activePage = useMemo(() => {
        return collectionForm.form_content.pages[activeIndex];
    }, [activeIndex, collectionForm]);

    const lastPage = useMemo(() => {
        let page = collectionForm.form_content.pages[activeIndex - 1];
        return page;
    }, [activeIndex, collectionForm]);

    const nextPage = useMemo(() => {
        if (!collectionForm) {
            return undefined;
        }
        let page = collectionForm.form_content.pages[activeIndex + 1];
        return page;
    }, [activeIndex, collectionForm]);

    return <Box>
        <Box>
            <Typography variant="h5">{collectionForm.form_content.title}</Typography>
            <Typography variant="body1">{collectionForm.form_content.subtitle}</Typography>
        </Box>
        <Container>
            <Box paddingY={2}>
                <Typography variant="body2">{activeIndex+1} / {collectionForm.form_content.pages.length}</Typography>
                <Paper elevation={2} style={{padding: '16px'}}>
                    <PageRenderer page={activePage} />
                </Paper>
            </Box>
            <Box paddingY={2} display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start">
                {
                    lastPage &&
                    <Button
                        variant="text"
                        color="primary"
                        size="small"
                        disableElevation
                        startIcon={<MdArrowBack size={18} />}
                        onClick={() => setActiveIndex(activeIndex - 1)}>
                        {lastPage.title}
                    </Button>
                }
                {
                    nextPage &&
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        disableElevation
                        endIcon={<MdArrowForward size={18} />}
                        onClick={() => setActiveIndex(activeIndex + 1)}>
                        {nextPage.title}
                    </Button>
                }
            </Box>
        </Container>
    </Box>
}