import React from "react";
import { FieldEditorProps } from ".";
import { TextArea } from "../components/TextArea";
import { TextConstraintsEditor } from "./TextConstraintEditor";

export function Paragraph(props: FieldEditorProps) {
    return <div style={{ width: '100%' }}>
        <TextConstraintsEditor {...props} />
    </div>
}

