import React from "react";
import { FieldEditorProps } from ".";
import { DropdownField } from "../../engine/fields";
import { SelectionOptionBuilder } from "./SelectionOptionBuilder";

export function Dropdown(props: FieldEditorProps<DropdownField>) {
    

    return <div style={{ width: '100%' }}>
        
        <SelectionOptionBuilder {...props}/>
    </div>
}

