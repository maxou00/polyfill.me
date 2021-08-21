import React from "react";
import { FieldEditorProps } from ".";
import { InputField } from "../components/InputField";
import { TextConstraintsEditor } from "./TextConstraintEditor";

export function ShortText(props: FieldEditorProps) {
    return <div style={{width: '100%'}}>
        <TextConstraintsEditor {...props}/>
    </div>
}