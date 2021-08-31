import { Button, Typography } from "@material-ui/core";
import Head from "next/head";
import { useEffect } from "react";
import { Logo } from "../ui/Logo";
import { init } from "ityped";
import { useRef } from "react";
import styles from "../styles/initial.module.scss";
import cln from "classnames";
import Link from "next/link";

let cases = [
    "Les soumissions de candidatures",
    "Les sondages",
    "Les études de marché",
    "Les prises de contact",
    "Collecter ce que vous voulez."
]

function IndexScreen() {
    const caseRef = useRef<HTMLSpanElement>();

    useEffect(() => {
        if (caseRef.current) {

            init(caseRef.current, {
                showCursor: true,
                typeSpeed: 100,
                backSpeed: 50,
                strings: cases
            })
        }
    }, []);

    return <div className={styles.page}>
        <Head>
            <title>Polyfill.me</title>
            <meta name="description" content="Data Collection made easier than ever" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <header className={styles.header}>
                <div className={styles.logoWrapper}>
                    <Logo size={28} />
                    <Typography variant="h6" className={styles.title}>Polyfill.me</Typography>
                </div>
                <div className={styles.menu}>

                    <span className={styles.item}>Accueil</span>
                    <span className={cln(styles.item, styles.btnLogin)}>Se connecter</span>
                </div>
            </header>
            <div className={styles.underHeader}>
                <p className={styles.bigText}>
                    Polyfill <br />est conçu pour <br /><span ref={caseRef} className={styles.useCases}></span>
                </p>
                <div className={styles.actions}>
                    <Link href="/editor" passHref>
                        <button className={styles.btnGetStarted}>
                            <span className="text" data-role="text">
                                Accéder à l&apos;éditeur
                            </span>
                            <i className="fi-rr-arrow-right" data-role="icon end"></i>
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    </div>
}

export default IndexScreen;