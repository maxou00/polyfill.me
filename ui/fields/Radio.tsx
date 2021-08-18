import React from "react";
import { FieldEditorProps } from ".";
import { SelectField } from "../../engine/fields";
import { SelectionOptionBuilder } from "./SelectionOptionBuilder";

export function Radio(props: FieldEditorProps<SelectField>) {
    return <div style={{width: '100%'}}>
        <SelectionOptionBuilder {...props}/>
    </div>
}