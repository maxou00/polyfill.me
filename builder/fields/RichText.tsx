import React from "react";
import { FieldEditorProps } from ".";
import { InputField } from "../components/InputField";
import { TextArea } from "../components/TextArea";
import { TextConstraintsEditor } from "./TextConstraintEditor";

export function RichText(props: FieldEditorProps) {
    return <div style={{width: '100%'}}>
        <TextConstraintsEditor {...props}/>
    </div>
}

