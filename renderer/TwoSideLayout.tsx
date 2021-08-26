import { useCollectionForm } from "../state/selectors";
import { DecorationLayer } from "./DecorationLayer";
import { Meta } from "./Meta";
import { PageNavigation } from "./PageNavigation";
import { PageStack } from "./PageStack";
import styles from "./styles/Layout.module.scss";

export function TwoSideLayout() {
    const pages = useCollectionForm().form_content.pages;
    return <div className={styles.formLayout}>
        <DecorationLayer className={styles.metaLayout}>
            <Meta />
        </DecorationLayer>
        <div className={styles.activePageLayout}>
            <div className={styles.page}>
                <PageStack />
            </div>
            <div className={styles.navigation}>
                <PageNavigation />
            </div>
        </div>
    </div>
}