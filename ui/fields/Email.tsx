import React from "react";
import { FieldEditorProps } from ".";
import { TextConstraintsEditor } from "./TextConstraintEditor";

export function Email(props: FieldEditorProps) {
    return <div style={{width: '100%'}}>
        <TextConstraintsEditor {...props}/>
    </div>
}

