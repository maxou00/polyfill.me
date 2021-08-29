import { Box, Button, withStyles } from "@material-ui/core";
import shadows from "@material-ui/core/styles/shadows";
import { useCallback } from "react";
import { MdArrowBack, MdArrowForward, MdDone } from "react-icons/md";
import { useDispatch } from "react-redux";
import { FormResponse } from "../engine/page";
import { sendResponse } from "../state/middlewares";
import { useCollectionActivePage, useFormErrors, usePageNavigation, usePageValidation } from "../state/selectors"

const NavButton = withStyles({
    root: {
        borderRadius: '24px',
        marginLeft: '4px',
        marginRight: '4px'
    },
    contained: {
        boxShadow: shadows[3]
    }
})(Button);

export function PageNavigation() {
    const navigation = usePageNavigation();
    const page = useCollectionActivePage();
    const validation = usePageValidation(page.key);
    const formValidation = useFormErrors();

    const dispatch = useDispatch();

    const navigateBack = useCallback(() => {
        navigation.back();
    }, [navigation]);

    const navigateNext = useCallback(() => {
        if(validation.isValid) {
            navigation.next();
        }
    }, [navigation, validation]);

    const onSubmitResponse = useCallback( async () => {
        let invalidIndex = formValidation.validate();
        if(invalidIndex) {
            if(invalidIndex !== page.key) {
                navigation.toKey(invalidIndex);
            }
            return 
        }

        let result = await (dispatch(sendResponse()) as unknown as Promise<FormResponse>)
            .then((done) => {
                if(done) {
                    alert(done.id);
                    /// show a success page or something like that.
                }
            });
    }, [dispatch, navigation, page, formValidation]);

    return <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
        <NavButton 
            color="primary" 
            variant="text"
            size="small"
            disabled={!navigation.hasBefore}
            onClick={navigateBack}
            startIcon={<MdArrowBack size={18} />}>
            Précédent
        </NavButton>
        <NavButton 
            variant="contained" 
            color="primary" 
            onClick={onSubmitResponse}
            endIcon={<MdDone size={18} />}>
                Envoyer
        </NavButton>
        <NavButton 
            color="primary" 
            variant="text"
            size="small"
            disabled={!validation.isValid || !navigation.hasNext}
            onClick={navigateNext}
            endIcon={<MdArrowForward size={18} />}>
            Suivant 
        </NavButton>
    </Box>
}