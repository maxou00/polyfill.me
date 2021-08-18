import React from "react";
import { useCallback } from "react";
import { MdClose, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { FieldEditorProps } from ".";
import { initialOption } from "../../engine/creators";
import { DecorableOption, DropdownField } from "../../engine/fields";
import { appendField } from "../../state/creator";
import { Button, IconButton } from "../components/Button";
import { InputField } from "../components/InputField";
import { List, ListItem, ListItemSecondary, ListItemText } from "../components/List";
import styles from "../../styles/fields.module.scss";
import { Dialog, DialogActions, DialogContent, DialogHeader } from "../components/Dialog";
import { useState } from "react";
import { AddOptionDialog } from "./AddOptionDialog";
import { SelectionOptionBuilder } from "./SelectionOptionBuilder";

export function Dropdown(props: FieldEditorProps<DropdownField>) {
    

    return <div style={{ width: '100%' }}>
        
        <SelectionOptionBuilder {...props}/>
    </div>
}

