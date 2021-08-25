import { Box, Button, ButtonGroup, IconButton } from "@material-ui/core";
import { MdArrowBack, MdArrowForward, MdDone, MdSend } from "react-icons/md";
import { usePageNavigation } from "../state/selectors"

export function PageNavigation() {
    const navigation = usePageNavigation();

    return <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
        {navigation.hasBefore && <IconButton color="primary" disabled={!navigation.hasBefore} onClick={navigation.back}>
            <MdArrowBack size={24} />
        </IconButton>}
        {navigation.hasNext && <IconButton color="primary" disabled={!navigation.hasNext} onClick={navigation.next}>
            <MdArrowForward size={24} />
        </IconButton>}
    </Box>
}