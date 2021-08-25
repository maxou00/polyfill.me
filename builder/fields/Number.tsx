import React from "react";
import { FieldEditorProps } from ".";
import { NumberConstraintsEditor } from "./NumberConstraintsEditor";

export function Number(props: FieldEditorProps) {
    return <div style={{ width: '100%' }}>
        <NumberConstraintsEditor {...props}/>
    </div>
}

