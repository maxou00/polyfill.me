import { Chip } from "@material-ui/core";
import { CellRendererProps } from ".";
import { SelectionConstraints } from "../../engine/fields";

export function SelectionCell(props: CellRendererProps<SelectionConstraints, string>) {
    return <Chip color="primary" size="small" label={props.answer} style={{margin: '2px'}}/>
}