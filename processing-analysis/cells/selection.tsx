import { Chip } from "@material-ui/core";
import { useMemo } from "react";
import { CellRendererProps } from ".";
import { randomColour } from "../../core/colours";
import { SelectionConstraints } from "../../engine/fields";

export function SelectionCell(props: CellRendererProps<SelectionConstraints, string>) {
    const color = useMemo(() => randomColour(), []);
    return <Chip color="primary" size="small" label={props.answer} style={{margin: '2px', background: color}}/>
}