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
    "Lancer des sondages.",
    "Collecter des candidatures.",
    "Réaliser des études de marché.",
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
                backDelay: 3000,
                cursorChar: '.',
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
            {
                JSON.stringify(process.env)
            }
            <div className={styles.headerWrapper}>
                <header className={styles.header}>
                    <div className={styles.logoWrapper}>
                        <Logo size={28} />
                        <Typography variant="h6" className={styles.title}>Polyfill.me</Typography>
                    </div>
                    <div className={styles.menu}>
                        <Link href="/" passHref>
                            <div className={styles.item}>
                                <span data-role="text">Accueil</span>
                            </div>
                        </Link>
                        <Link href="/auth/signin" passHref>
                            <div className={cln(styles.item, styles.btnLogin)}>
                                <span data-role="text">Se connecter</span>
                            </div>
                        </Link>
                    </div>
                </header>
                <div className={styles.underHeader}>
                    <p className={styles.bigTextWrapper}>
                        <span className={styles.bigText}>Polyfill est pour</span>
                        <span ref={caseRef} className={cln(styles.bigText, styles.useCases)}></span>
                    </p>
                    <div className={styles.actions}>
                        <Link href="/editor" passHref>
                            <button className={styles.btnGetStarted}>
                                <span data-role="glow"></span>
                                <span className="text" data-role="text">
                                    Accéder à l&apos;éditeur
                                </span>
                                <i className="fi-rr-arrow-right" data-role="icon end"></i>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    </div>
}

export default IndexScreen;