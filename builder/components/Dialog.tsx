import { PropsWithChildren } from "react";
import { Overlay } from "./overlay";
import styles from "../../styles/overlay.module.scss";

export interface DialogProps {
    open: boolean;
    onClose(): any;
}

export function Dialog(props: PropsWithChildren<DialogProps>){
    return <Overlay open={props.open}>
        <DialogWrapper>
            {props.children}
        </DialogWrapper>
    </Overlay>
}

export function DialogWrapper(props: PropsWithChildren<{}>) {
    return <div className={styles.dialogWrapper}>
        {props.children}
    </div>
}

export function DialogHeader(props: PropsWithChildren<{}>) {
    return <div className={styles.dialogHeader}>
        {props.children}
    </div>
}

export function DialogContent(props: PropsWithChildren<{}>) {
    return <div className={styles.dialogContent}>
        {props.children}
    </div>
}

export function DialogActions(props: PropsWithChildren<{}>) {
    return <div className={styles.dialogActions}>
        {props.children}
    </div>
}