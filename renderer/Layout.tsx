import { useMemo, useState } from "react";
import { useCollectionForm } from "../state/selectors";
import { ActivePage } from "./ActivePage";
import { DecorationLayer } from "./DecorationLayer";
import { Meta } from "./Meta";
import styles from "./styles/Layout.module.scss";

export function Layout() {
    return <div className={styles.formLayout}>
        <DecorationLayer className={styles.metaLayout}>
        <Meta/>
        </DecorationLayer>  
        <div className={styles.activePageLayout}>
        <ActivePage/>
        </div>
    </div>
}