import { Box } from "@material-ui/core";
import React from "react";
import { FieldEditorProps } from ".";
import { FileConstraintsEditor } from "./FileConstraintsEditor";

export function File(props: FieldEditorProps) {
    return <Box width="100%">
        <FileConstraintsEditor {...props}/>
    </Box>
}

