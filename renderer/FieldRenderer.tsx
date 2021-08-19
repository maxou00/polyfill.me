import { FieldRendererProps } from "./fields";
import { CheckboxFieldRenderer } from "./fields/CheckboxFieldRenderer";
import { ChipFieldRenderer } from "./fields/ChipFieldRenderer";
import { DateFieldRenderer } from "./fields/DateFieldRenderer";
import { DropdownFieldRenderer } from "./fields/DropdownFieldRenderer";
import { FileFieldRenderer } from "./fields/FileFieldRenderer";
import { NumberFieldRenderer } from "./fields/NumberFieldRenderer";
import { RadioFieldRenderer } from "./fields/RadioFieldRenderer";
import { TextFieldRenderer } from "./fields/TextFieldRenderer";
import { TimeFieldRenderer } from "./fields/TimeFieldRenderer";

export function FieldRenderer(props: FieldRendererProps) {
    if(props.question.type === "text") {
        return <TextFieldRenderer {...props}/>
    }
    if(props.question.type === "number") {
        if( ["date", "datetime"].includes(props.question.format) ) {
            return <DateFieldRenderer {...props}/>
        }
        if(props.question.format === "time") {
            return <TimeFieldRenderer {...props}/>
        }
        return <NumberFieldRenderer {...props}/>
    }
    if(props.question.type === "file") {
        return <FileFieldRenderer {...props}/>
    }
    if(props.question.type === "selection" && props.question.format === "dropdown") {
        return <DropdownFieldRenderer {...props}/>
    }
    if(props.question.type === "selection" && props.question.format === "chip") {
        return <ChipFieldRenderer {...props}/>
    }
    if(props.question.type === "selection" && props.question.format === "radio") {
        return <RadioFieldRenderer {...props}/>
    }
    if(props.question.type === "selection" && props.question.format === "checkbox") {
        return <CheckboxFieldRenderer {...props}/>
    }
    return <></>
}