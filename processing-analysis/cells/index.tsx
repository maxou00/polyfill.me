import { ContentField } from "../../engine/fields";
import { FileCell } from "./file";
import styles from "./cellStyle.module.scss";
import { SelectionCell } from "./selection";
import { NoTransformButton } from "../../ui/styled";
import { Box, Popover } from "@material-ui/core";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { DateCell, DateTimeCell } from "./date";

export interface CellRendererProps<F = ContentField, A = any> {
    field: F,
    answer: A;
}

export function CellRenderer(props: CellRendererProps) {
    if (typeof props.answer === "object" && props.answer.length) {
        return <ArrayCellRenderer {...props} />
    }
    if (props.field.type === "file") {
        return <FileCell {...props} />
    }
    if (props.field.type === "selection") {
        return <SelectionCell {...props} />
    }
    if (props.field.type === "number" && props.field.format === "date") {
        return <DateCell {...props} />
    }
    if (props.field.type === "number" && props.field.format === "datetime") {
        return <DateTimeCell {...props} />
    }
    return <span style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {props.answer}
    </span>
}

function ArrayCellRenderer(props: CellRendererProps<ContentField, Array<any>>) {
    const [anchor, setAnchor] = useState<HTMLElement>(null);

    if (props.answer.length <= 2) {
        return <div className={styles.cellArray}>
            {
                props.answer.map((entry) => {
                    return <CellRenderer {...props} answer={entry} key={props.field.key} />
                })
            }
        </div>
    }
    return <div className={styles.cellArray}>
        <CellRenderer field={props.field} answer={props.answer[0]}/>
        <NoTransformButton
            variant="outlined"
            color="default"
            size="small"
            endIcon={anchor ? <MdKeyboardArrowUp/> : <MdKeyboardArrowDown/>}
            onClick={(ev) => setAnchor(ev.currentTarget)}
            style={{margin: '2px', borderRadius: '24px'}}>
            {!anchor ? `+${props.answer.length -1} autres` : 'Fermer'}
        </NoTransformButton>
        <Popover
            open={Boolean(anchor)}
            anchorEl={anchor}
            elevation={2}
            onClose={(el) => setAnchor(undefined)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}>

            <Box minWidth="320px" padding={2} minHeight="180px" style={{border: '1px dashed #777'}}>
                {
                    props.answer.map((entry) => {
                        return <CellRenderer {...props} answer={entry} key={props.field.key} />
                    })
                }
            </Box>
        </Popover>
    </div>
}