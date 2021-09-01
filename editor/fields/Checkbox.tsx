import React from "react";
import { FieldEditorProps } from ".";
import { CheckboxField, SelectField } from "../../engine/fields";
import { SelectionOptionBuilder } from "./SelectionOptionBuilder";

export function Checkbox(props: FieldEditorProps<CheckboxField>) {
    return <div style={{width: '100%'}}>
        <SelectionOptionBuilder {...props}/>
    </div>
}

