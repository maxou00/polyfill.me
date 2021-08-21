import React from "react";
import { FieldEditorProps } from ".";
import { ChipField } from "../../engine/fields";
import { SelectionOptionBuilder } from "./SelectionOptionBuilder";

export function Chip(props: FieldEditorProps<ChipField>) {
    return <div style={{width: '100%'}}>
        <SelectionOptionBuilder {...props}/>
    </div>
}

