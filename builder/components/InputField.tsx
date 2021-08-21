import { HTMLProps, ReactNode } from "react";
import styles from "../../styles/form.module.scss";

interface Props {
    label?: string;
    helper?: string;
    error?: string;
    type?: string;
    inputProps?: HTMLProps<HTMLInputElement>;
    start?: ReactNode;
    end?: ReactNode;
}

export function InputField(props: Props) {
    return <div className={styles.inputfield}>
        {props.label && <div className={styles.header}>
            <label>{props.label}</label>
        </div>}
        <div className={styles.content}>
            {props.start && <span className={styles.start}>{props.start}</span> }
            <input className={styles.input} type={props.type} {...props.inputProps} />
            {props.end && <span className={styles.end}>{props.end}</span> }
        </div>
        {
            props.helper && <div className={styles.helper}>
                <span className={styles.text}>{props.helper}</span>
            </div>
        }
        {
            props.error && <div className={styles.helper + " " + styles.error}>
                <span className={styles.text}>{props.error}</span>
            </div>
        }
    </div>
}