import { DashboardAppBar } from "../ui/DashboardAppBar";
import { Initializer } from "../ui/Initializer";
import styles from "../styles/Dashboard.module.scss";
import { useState } from "react";
import { DataForm } from "../engine/page";
import { Box, Container } from "@material-ui/core";
import { FormReport } from "../processing-analysis/FormReport";
import Head from "next/head";

export default function Dashboard() {
    const [selectedForm, setSelectedForm] = useState<DataForm>();

    return <Initializer>
        <Head>
            <title>Dashboard</title>
        </Head>
        <div className={styles.page}>
            <DashboardAppBar onFormSelected={setSelectedForm} />
            <div className={styles.body}>
                {
                    selectedForm && <Container>
                        <FormReport form={selectedForm} />
                    </Container>
                }
            </div>
        </div>
    </Initializer>
}