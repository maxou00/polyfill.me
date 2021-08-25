import { Box, Button, ButtonGroup } from "@material-ui/core";
import { MdArrowBack, MdArrowForward, MdDone, MdSend } from "react-icons/md";
import { usePageNavigation } from "../state/selectors"

export function PageNavigation() {
    const navigation = usePageNavigation();

    return <Box width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
        <ButtonGroup fullWidth size="small" variant="outlined" color="primary" >
            {navigation.hasBefore && <Button disabled={!navigation.hasBefore} startIcon={<MdArrowBack size={16}/>} onClick={navigation.back}>Précédent (Page {navigation.activeIndex })</Button> }
            {navigation.hasNext && <Button disabled={!navigation.hasNext} endIcon={<MdArrowForward size={16}/>} onClick={navigation.next}>Suivant (Page {navigation.activeIndex+2})</Button>}
            <Button endIcon={<MdDone size={16}/>} onClick={navigation.next}>Envoyer la réponse</Button>}
        </ButtonGroup>
    </Box>
}