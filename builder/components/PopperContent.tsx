import { PropsWithChildren } from "react";
import { PopperChildrenProps } from "react-popper";
import styles from "../../styles/overlay.module.scss";

export function PopperContent(props: PropsWithChildren<{ popper: PopperChildrenProps, open: boolean }>) {
    return <div className={styles.popperContent} style={{...props.popper.style}} data-open={props.open}>
        {props.open && props.children}
    </div>
}