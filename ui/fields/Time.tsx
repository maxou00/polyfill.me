import React from "react";
import { FieldEditorProps } from ".";
import { InputField } from "../components/InputField";

export function Time(props: FieldEditorProps) {
    return <div style={{width: '100%'}}>
        <InputField
            label="Heure minimale"
            inputProps={{
                type: "time"
            }}/>
        <InputField
            label="Heure maximale"
            inputProps={{
                type: "time"
            }}/>
    </div>
}

