import { Container, Toolbar, Typography } from "@material-ui/core";
import Head from "next/head";
import { PropsWithChildren } from "react";
import { DashboardLayout } from "../dashboard/DashboardLayout";
import { useInit } from "../ui/Initializer";

export function SettingsPageLayout(props: PropsWithChildren<{}>) {
    const session = useInit();

    if(!session) {
        return <></>
    }
    
    return <DashboardLayout>
        <Head>
            <title>Paramètres</title>
        </Head>
        <Toolbar variant="dense">
            <Typography variant="h5">Paramètres</Typography>
        </Toolbar>
        <Container>
            {props.children}
        </Container>
    </DashboardLayout>
}