import { FieldRendererProps } from "./fields";
import { TextFieldRenderer } from "./fields/TextFieldRenderer";

export function FieldRenderer(props: FieldRendererProps) {
    if(props.question.type === "text") {
        return <TextFieldRenderer {...props}/>
    }
    return <></>
}