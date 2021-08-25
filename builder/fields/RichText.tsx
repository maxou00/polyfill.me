import React from "react";
import { FieldEditorProps } from ".";
import { TextConstraintsEditor } from "./TextConstraintEditor";

export function RichText(props: FieldEditorProps) {
    return <div style={{width: '100%'}}>
        <TextConstraintsEditor {...props}/>
    </div>
}

