import { Box, Button, ButtonGroup } from "@material-ui/core";
import { usePageNavigation } from "../state/selectors"

export function PageNavigation() {
    const navigation = usePageNavigation();

    return <Box width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
        <ButtonGroup size="small">
            <Button variant="contained" color="secondary" disabled={!navigation.hasBefore} onClick={navigation.back}>Precedent</Button>
            <Button variant="contained" color="secondary" disabled={!navigation.hasNext} onClick={navigation.next}>Suivant</Button>
        </ButtonGroup>
    </Box>
}