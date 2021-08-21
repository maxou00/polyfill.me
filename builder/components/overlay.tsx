import React, { PropsWithChildren } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "../../styles/components.module.scss";

interface Props {
    open: boolean;
}

export function Overlay(props: PropsWithChildren<Props>) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        if (window) {
            setIsBrowser(true);
        }
    }, []);

    if (isBrowser) {
        return createPortal(
            <div className={styles.overlay} data-open={props.open}>
                <div className={styles.contentWrapper}>
                    {props.children}
                </div>
            </div>,
            document.querySelector("#modal-root")
        )
    }
    return <></>
}