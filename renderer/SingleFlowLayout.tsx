import { Box, Button, Container } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import shadows from "@material-ui/core/styles/shadows";
import { useCallback } from "react";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useCollectionForm } from "../state/selectors";
import { DecorationLayer } from "./DecorationLayer";
import { Meta } from "./Meta";
import { PageHeader, PageStack } from "./PageStack";
import styles from "./styles/SingleFlowLayout.module.scss";
import cln from "classnames";
import { createContext } from "react";
import { useMemo } from "react";
import { useContext } from "react";
import { PageNavigation } from "./PageNavigation";

interface IFlowContext {
    initial: boolean;
    active: number;
    hasBefore: boolean;
    hasNext: boolean;
    back(): any;
    next(): any;
}

const initialFlowContext: IFlowContext = {
    initial: true,
    active: 0,
    hasBefore: false,
    hasNext: false,
    back: () => { },
    next: () => { }
}

const FlowContext = createContext<IFlowContext>(initialFlowContext);

export function useFlow() {
    return useContext(FlowContext);
}

export function SingleFlowLayout() {
    const [activeIndex, setActiveIndex] = useState(0);
    const { brand, background } = useCollectionForm().form_content.decoration.branding;
    const canGoBack = useMemo(() => {
        return activeIndex > 0 ? true : false;
    }, [activeIndex]);

    const canGoNext = useMemo(() => {
        return activeIndex < 1 ? true : false;
    }, [activeIndex]);

    const goNext = useCallback(() => {
        if (canGoNext) {
            setActiveIndex(activeIndex + 1);
        }
    }, [activeIndex, canGoNext]);

    const goBack = useCallback(() => {
        if (canGoBack) {
            setActiveIndex(activeIndex - 1);
        }
    }, [activeIndex, canGoBack]);

    const placement = useCallback((index: number) => {
        if (index < activeIndex) {
            return "top";
        }
        else if (index > activeIndex) {
            return "bottom";
        }
        return "center";
    }, [activeIndex]);

    return <FlowContext.Provider value={{
        initial: false,
        active: activeIndex,
        hasBefore: canGoBack,
        hasNext: canGoNext,
        back: goBack,
        next: goNext
    }}>
        <Box className={styles.layout}>
            <Box className={cln(styles.node, styles.meta)} data-placement={placement(0)}>
                <DecorationLayer>
                    <Container>
                        <Meta />
                    </Container>
                    <Box margin={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Button endIcon={<MdKeyboardArrowDown size={24} color={blueGrey[900]} />} onClick={() => setActiveIndex(1)} style={{ background: 'white', boxShadow: shadows[4] }}>Soumettre une Réponse</Button>
                    </Box>
                </DecorationLayer>
            </Box>
            <Box className={cln(styles.node, styles.pages)} data-placement={placement(1)}>
                <Box className={styles.header}>
                    <PageHeader />
                </Box>
                <Box padding={2} className={styles.stackContainer}>
                    <PageStack />
                </Box>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" className={styles.navigationContainer}>
                    {<PageNavigation />}
                </Box>
            </Box>
        </Box>
    </FlowContext.Provider>
}