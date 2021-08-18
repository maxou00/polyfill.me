import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { HTMLProps, PropsWithChildren } from "react";
import styles from "../../styles/buttons.module.scss";

interface Props {
    buttonProps: DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
    rounded?: boolean;
    start?: ReactNode;
    end?: ReactNode;
}

interface IconButtonProps {
    buttonProps: DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
}

export function Button(props: PropsWithChildren<Props>){
    return <button {...props.buttonProps} data-rounded={props.rounded} className={styles.Button + " " + props.buttonProps.className}>
        { props.start && <span className={styles.start}>{props.start}</span> }
        <span className={styles.text}>{props.children}</span>
        { props.end && <span className={styles.end}>{props.end}</span> }
    </button>
}

export function IconButton(props: PropsWithChildren<Props>){
    return <button {...props.buttonProps} className={styles.IconButton + " " + props.buttonProps.className}>
        <span className={styles.icon}>{props.children}</span>
    </button>
}