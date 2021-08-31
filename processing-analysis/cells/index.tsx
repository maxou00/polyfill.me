import { ContentField } from "../../engine/fields";
import { FileCell } from "./file";
import styles from "./cellStyle.module.scss";
import { SelectionCell } from "./selection";

export interface CellRendererProps<F = ContentField, A = any> {
    field: F,
    answer: A;
}

export function CellRenderer(props: CellRendererProps) {
    if(typeof props.answer === "object" && props.answer.length) {
        return <ArrayCellRenderer {...props}/>
    }
    if(props.field.type === "file") {
        return <FileCell {...props}/>
    }
    if(props.field.type === "selection") {
        return <SelectionCell {...props}/>
    }
    return <span style={{maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        {props.answer}
    </span>
}

function ArrayCellRenderer(props: CellRendererProps<ContentField, Array<any>>) {
    return <div className={styles.cellArray}>
        {
            props.answer.map((entry) => {
                return <CellRenderer {...props} answer={entry} key={props.field.key}/>
            })
        }
    </div>
}