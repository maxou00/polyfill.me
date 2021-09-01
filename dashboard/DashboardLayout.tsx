import Head from "next/head";
import { DashboardAppBar } from "./DashboardAppBar";
import styles from "../styles/Dashboard.module.scss";
import { PropsWithChildren } from "react";

export function DashboardLayout(props: PropsWithChildren<{}>) {
    return <div className={styles.page}>
        <Head>
            <title>Dashboard</title>
        </Head>
        <DashboardAppBar />
        <div className={styles.body}>
            {
                props.children
            }
        </div>
    </div>
}