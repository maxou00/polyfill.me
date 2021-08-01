import { ContentField } from "../../engine/fields";
import { InputField } from "../components/InputField";

export function NumberConstraintsEditor(props: {field: ContentField}) {
    
    if(props.field.type === "number" && ( props.field.format === "date" || props.field.format === "datetime") ) {
        return <DateConstraintsEditor {...props}/>
    }
    return <div style={{width: '100%'}}>
        <InputField label="Valeur minimale" inputProps={{
            type: "number",
        }}/>
        <InputField label="Valeur maximale" inputProps={{
            type: "number",
        }}/>
    </div>
}

export function DateConstraintsEditor(props: {field: ContentField}) {
    return <div style={{width: '100%'}}>
        <InputField
            label="Date minimale"
            inputProps={{
                type: "date"
            }}/>
        
        <InputField
            label="Date maximale"
            inputProps={{
                type: "date"
            }}/>
    </div>
}