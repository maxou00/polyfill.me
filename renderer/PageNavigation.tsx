import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, withStyles, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import shadows from "@material-ui/core/styles/shadows";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useCallback } from "react";
import { MdArrowBack, MdArrowForward, MdDone } from "react-icons/md";
import { useDispatch } from "react-redux";
import Loader from "react-spinners/PropagateLoader";
import { isEligibleForNewResponse } from "../core/utils";
import { FormResponse } from "../engine/page";
import { sendResponse } from "../state/middlewares";
import { useCollectionActivePage, useCollectionForm, useFormErrors, usePageNavigation, usePageValidation } from "../state/selectors"
import { useRenderingMode } from "./FormRenderer";

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
    const form = useCollectionForm();
    const navigation = usePageNavigation();
    const page = useCollectionActivePage();
    const validation = usePageValidation(page.key);
    const formValidation = useFormErrors();
    const {mode} = useRenderingMode();
    const [busy, setBusy] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    const navigateBack = useCallback(() => {
        navigation.back();
    }, [navigation]);

    const navigateNext = useCallback(() => {
        if (validation.isValid) {
            navigation.next();
        }
    }, [navigation, validation]);

    const onSubmitResponse = useCallback(async () => {
        let invalidIndex = formValidation.validate();
        if (invalidIndex) {
            if (invalidIndex !== page.key) {
                navigation.toKey(invalidIndex);
            }
            return
        }

        setBusy(true);

        if(mode === "live") {
            (dispatch(sendResponse()) as unknown as Promise<FormResponse>)
            .then((done) => {
                if (done) {
                    setSubmitted(true);
                    /// show a success page or something like that.
                }
                else {
                    setSubmitted(false);
                }
            })
            .finally(() => {
                setBusy(false);
            })
        }
    }, [dispatch, navigation, page, formValidation, mode]);

    const onTerminate = useCallback(() => {
        setSubmitted(false);
        router.replace("/");
    }, [router]);

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
            disabled={!isEligibleForNewResponse(form.id)}
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
        <Dialog open={busy || submitted} maxWidth="sm" fullWidth>
            <DialogContent>
                <Box minHeight="30vh" display="flex" flexDirection="column" alignItems="center" justifyContent="space-around">
                    {busy && <Loader color="indigo" />}
                    {!busy && submitted && <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <MdDone color={green[500]} size={64}/>
                        <Typography>Votre réponse a été envoyée.</Typography>
                    </Box>}
                </Box>
            </DialogContent>
            {!busy && <DialogActions>
                <Button variant="outlined" color="default" onClick={onTerminate}>Terminer</Button>
            </DialogActions>}
        </Dialog>
    </Box>
}