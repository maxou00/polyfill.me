import { Box, List, ListItem, ListItemText, Popover, Typography } from "@material-ui/core";
import { Logo } from "../ui/Logo";
import styles from "../styles/DashboardAppbar.module.scss"
import Link from "next/link";
import { useGlobalState } from "../state/selectors";
import { useCallback, useState } from "react";
import { useInit } from "../ui/Initializer";
import { useRouter } from "next/dist/client/router";

export function DashboardAppBar() {
    const session = useInit();
    const { forms } = useGlobalState();
    const [formsMenuAnchor, setFormsMenuAnchor] = useState<HTMLElement>();
    const router = useRouter();

    const onFormSelected = useCallback((formId: string) => {
        setFormsMenuAnchor(undefined);
        router.replace("/datasets/"+formId);
    }, [router]);

    return <div data-role="appbar" className={styles.bar}>
        <div className={styles.logoWrapper}>
            <Logo size={24} />
            <Typography variant="h6" style={{ marginLeft: '8px', fontWeight: 600 }}>Polyfill.me</Typography>
        </div>
        <div className={styles.menu}>
            <Link href="/dashboard" passHref={true}>
                <div className={styles.menuItem}>
                    <span className={styles.icon}>
                        <i className="fi-rr-home"></i>
                    </span>
                    <span className={styles.title}>
                        Accueil
                    </span>
                </div>
            </Link>
            <Link href="/editor" passHref={true}>
                <div className={styles.menuItem}>
                    <span className={styles.icon}>
                        <i className="fi-rr-pencil"></i>
                    </span>
                    <span className={styles.title}>
                        Editeur
                    </span>
                </div>
            </Link>
            <div className={styles.menuItem}
                onClick={(ev) => setFormsMenuAnchor(ev.currentTarget)}>
                <span className={styles.icon}>
                    <i className="fi-rr-form"></i>
                </span>
                <span className={styles.title}>
                    Schémas
                </span>
                <span className={styles.icon}>
                    <i className="fi-rr-angle-small-down"></i>
                </span>
            </div>
            {forms.length > 0 && <Popover
                anchorEl={formsMenuAnchor}
                elevation={2}
                open={Boolean(formsMenuAnchor)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={() => setFormsMenuAnchor(undefined)}>
                <Box minWidth="320px">
                    <List disablePadding>
                        {
                            forms.map((f) => {
                                return <ListItem key={f.id} button onClick={() => onFormSelected(f.id)}>
                                    <ListItemText
                                        primary={f.form_content.title}/>
                                </ListItem>
                            })
                        }
                    </List>
                </Box>
            </Popover>}
            {
                session && <Link href="/settings" passHref={true}>
                    <div className={styles.menuItem}>
                        <span className={styles.icon}>
                            <i className="fi-rr-user"></i>
                        </span>
                        <span className={styles.title + " " + styles.profile}>{session.user.user_metadata.name || session.user.email}</span>
                    </div>
                </Link>
            }
        </div>
    </div>
}