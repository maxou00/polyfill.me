import { Dialog, DialogContent, DialogTitle, Typography } from "@material-ui/core";
import { PropsWithChildren, useEffect, useLayoutEffect, useState } from "react";
import { useInit } from "./Initializer";
import { SetupProfile } from "./SetupProfile";

export function ForceProfileSetup(props: PropsWithChildren<{}>) {
    const [requireSetup, setRequireSetup] = useState(false);
    const {user} = useInit();

    useLayoutEffect(() => {
        if(
            !user.user_metadata.name     
        ) {
            setRequireSetup(true);
        }
    }, [user.user_metadata]);

    return <>
        {props.children}
        <Dialog open={requireSetup} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography variant="h6">PLus qu&apos;une étape...</Typography>
            </DialogTitle>
            <DialogContent dividers>
                <SetupProfile onSetupComplete={(u) => setRequireSetup(false)}/>
            </DialogContent>
        </Dialog>
    </>
}