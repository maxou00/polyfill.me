import { CellRendererProps } from ".";
import { DateField } from "../../engine/fields";

export function DateCell(props: CellRendererProps<DateField, string>) {
    if(!props.answer) {
        return  <></>
    }
    let date = new Date(Date.parse(props.answer));
    return <div>
        <span>{date.toLocaleDateString()}</span>
    </div>
}

export function DateTimeCell(props: CellRendererProps<DateField, string>) {
    if(!props.answer) {
        return  <></>
    }
    let date = new Date(Date.parse(props.answer));
    return <div>
        <span>{date.toLocaleDateString()} {date.toLocaleTimeString()}</span>
    </div>
}