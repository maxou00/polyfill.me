import { Box, Button, Checkbox, FormControlLabel, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Menu, MenuItem, Popper } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { MouseEvent } from "react";
import { useCallback, useState } from "react";
import { MdAdd, MdClose, MdEdit, MdMoreVert } from "react-icons/md";
import { useDispatch } from "react-redux";
import { FieldEditorProps } from ".";
import { DecorableOption, DropdownField, SelectField } from "../../engine/fields";
import { appendField } from "../../state/creator";
import { AddOptionDialog } from "./AddOptionDialog";


export function SelectionOptionBuilder(props: FieldEditorProps<SelectField<{}>>) {
    const [selectedOption, setSelectedOption] = useState<DecorableOption>();
    const [addOptionOpen, setAddOptionOpen] = useState(false);
    const [editingOption, setEditingOption] = useState<DecorableOption>();
    const [reference, setReference] = useState<HTMLButtonElement>();

    const onCloseMenu = useCallback(() => {
        setReference(undefined);
        setSelectedOption(undefined);
    }, []);

    const onAllowCustomValue = useCallback((allow: boolean) => {
        let field = {...props.field};
        field.allowCustomValue = allow;
        props.onChange(field);
    }, [props]);

    const editOption = useCallback((option: DecorableOption) => {
        onCloseMenu();
        setEditingOption(option);
        setAddOptionOpen(true);
    }, [onCloseMenu]);

    const addOption = useCallback((option: DecorableOption) => {
        let idx = props.field.options.findIndex((o) => o.key === option.key);
        let cpy = {
            ...props.field,
        }
        if (idx >= 0) {
            cpy.options[idx] = option;
        }
        else {
            cpy.options.push(option);
        }
        props.onChange(cpy);
        setAddOptionOpen(false);
        setEditingOption(undefined);
        onCloseMenu();
    }, [props, onCloseMenu]);

    const removeOption = useCallback((key: string) => {
        let cpy = {
            ...props.field,
            options: props.field.options.filter((o) => o.key !== key)
        }
        onCloseMenu();
        props.onChange(cpy);
    }, [props, onCloseMenu]);

    const onItemContextRequested = useCallback((ev: MouseEvent<HTMLButtonElement>, item: DecorableOption) => {
        ev.preventDefault();
        setReference(ev.currentTarget);
        setSelectedOption(item);
    }, []);

    return <div style={{ width: '100%' }}>
        <List dense disablePadding>
            {
                props.field.options.map((option, i, arr) => {
                    return <ListItem divider={i < arr.length - 1} key={option.key}>
                        <ListItemText
                            primary={option.value}
                            secondary={option.description} />
                        <ListItemSecondaryAction>
                            <IconButton size="small" onClick={(ev) => onItemContextRequested(ev, option)}>
                                <MdMoreVert size={18} fill={grey[400]} />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                })
            }
        </List>

        <Menu elevation={1} onClose={onCloseMenu} anchorEl={reference} anchorOrigin={{ horizontal: 'right', vertical: "center" }} open={Boolean(reference)}>
            <MenuItem value="1" divider onClick={() => editOption(selectedOption)}>
                <MdEdit size={16} fill={grey[500]} />
                <span style={{ marginLeft: '4px', fontSize: '14px' }}>Modifier</span>
            </MenuItem>
            <MenuItem value="2" onClick={() => removeOption(selectedOption.key)}>
                <MdClose size={16} fill={grey[500]} />
                <span style={{ marginLeft: '4px', fontSize: '14px' }}>Supprimer</span>
            </MenuItem>
        </Menu>
        <Box paddingY={1} display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
            <Button variant="contained" size="small" disableElevation color="primary" onClick={() => setAddOptionOpen(true)}>
                Ajouter une option
            </Button>
        </Box>
        {
            props.field.format !== "chip" && <Box paddingY={1}>
                <FormControlLabel label="Autoriser une valeur différente" control={<Checkbox checked={props.field.allowCustomValue} onChange={(ev,check) => onAllowCustomValue(check)} color="primary" />} />
            </Box>
        }
        <AddOptionDialog
            editing={editingOption}
            open={addOptionOpen}
            onClose={() => setAddOptionOpen(false)}
            onAppend={addOption}
            maxWidth="sm"
            fullWidth />
    </div>
}