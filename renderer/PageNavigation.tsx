import { Box, Button, withStyles } from "@material-ui/core";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { usePageNavigation } from "../state/selectors"

const NavButton = withStyles({
    root: {
        borderRadius: '24px',
        marginLeft: '4px',
        marginRight: '4px'
    }
})(Button);

export function PageNavigation() {
    const navigation = usePageNavigation();

    return <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
        {navigation.hasBefore && <NavButton 
            color="primary" 
            size="small"
            disabled={!navigation.hasBefore}
            onClick={navigation.back}
            startIcon={<MdArrowBack size={18} />}>
            Précédent
        </NavButton>}
        {navigation.hasNext && <NavButton 
            color="primary" 
            variant="contained"
            size="small"
            disabled={!navigation.hasNext}
            onClick={navigation.next}
            endIcon={<MdArrowForward size={18} />}>
            Suivant 
        </NavButton>}
    </Box>
}