import { ContentField } from "../../engine/fields";
import { InputField } from "../components/InputField";

export function TextConstraintsEditor(props: {field: ContentField}) {
    return <div style={{width: '100%'}}>
        <InputField label="Nombre maximal de caractères" inputProps={{
            type: "number",
        }}/>
    </div>
}