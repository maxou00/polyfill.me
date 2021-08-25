import React from "react";
import { FieldEditorProps } from ".";
import { NumberConstraintsEditor } from "./NumberConstraintsEditor";

export function Date(props: FieldEditorProps) {
    return <div style={{width: '100%'}}>
        <NumberConstraintsEditor {...props}/>
    </div>
}

