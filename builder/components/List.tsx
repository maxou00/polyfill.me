import { MouseEvent, PropsWithChildren, ReactNode } from "react";
import styles from "../../styles/list.module.scss";

interface ListProps {

}

interface ListItemProps {
    onContextMenu?(ev: MouseEvent<HTMLLIElement>): any;
}

interface ListItemTextProps {
    primary: ReactNode;
    secondary?: ReactNode;
}

interface ListItemSecondaryProps {

}

export function List(props: PropsWithChildren<ListProps>) {
    return <ul className={styles.List}>
        {props.children}
    </ul>
}

export function ListItem(props: PropsWithChildren<ListItemProps>) {
    return <li className={styles.item} onContextMenu={props.onContextMenu}>
        {props.children}
    </li>
}

export function ListItemText(props: PropsWithChildren<ListItemTextProps>) {
    return <div className={styles.text}>
        <span className={styles.primary}>{props.primary}</span>
        { props.secondary && <span className={styles.secondary}>{props.secondary}</span>}
    </div>
}

export function ListItemSecondary(props: PropsWithChildren<ListItemSecondaryProps>) {
    return <div className={styles.end}>
        {props.children}
    </div>
}