import { Box, Button, ButtonGroup } from "@material-ui/core";
import { usePageNavigation } from "../state/selectors"

export function PageNavigation() {
    const navigation = usePageNavigation();

    return <Box width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
        <ButtonGroup size="small" variant="contained" color="primary" >
            {navigation.hasBefore && <Button disabled={!navigation.hasBefore} onClick={navigation.back}>Précédent (Page {navigation.activeIndex })</Button> }
            {navigation.hasNext && <Button disabled={!navigation.hasNext} onClick={navigation.next}>Suivant (Page {navigation.activeIndex+2})</Button>}
        </ButtonGroup>
    </Box>
}