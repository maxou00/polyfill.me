import { ChangeEvent, MouseEvent, useState } from "react";
import { MdClose } from "react-icons/md";
import { DecorableOption } from "../../engine/fields";
import { InputField } from "../components/InputField";
import { initialOption } from "../../engine/creators";
import { useCallback } from "react";
import { useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, IconButton, TextField, Toolbar } from "@material-ui/core";

interface Props extends DialogProps {
    editing?: DecorableOption;
    onAppend(option: DecorableOption): any;
}

export function AddOptionDialog(props: Props) {
    const [option, setOption] = useState<DecorableOption>(initialOption);

    useEffect(() => {
        if (props.editing) {
            setOption(props.editing);
        }
        else {
            setOption(initialOption());
        }
    }, [props.editing]);

    const onClose = useCallback(() => {
        if (props.onClose) {
            props.onClose({}, "backdropClick");
        }
    }, [props]);

    const onTitleChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let copy = { ...option };
        copy.value = ev.currentTarget.value
        setOption(copy);
    }, [option]);

    const onCommentChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let copy = { ...option };
        copy.description = ev.currentTarget.value

        setOption(copy);
    }, [option]);

    const onSubmit = useCallback(() => {
        props.onAppend(option);
        setOption(initialOption());
    }, [props, option]);

    return <Dialog {...props}>
        <DialogTitle>
            <Toolbar style={{ justifyContent: 'space-between', padding: '0px' }}>
                <h3 style={{ margin: '0px' }}>
                    {props.editing ? props.editing.value : 'Ajouter une option'}
                </h3>
                <IconButton onClick={onClose}>
                    <MdClose size={18} />
                </IconButton>
            </Toolbar>
        </DialogTitle>
        <DialogContent>
            <div style={{ margin: '16px 0px' }}>
                <TextField
                    label="Option"
                    type="text"
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={option.value}
                    onChange={onTitleChange} />
            </div>
            <div style={{ margin: '16px 0px' }}>
                <TextField
                    label="Commentaire sur cette option"
                    type="text"
                    fullWidth
                    size="small"
                    multiline
                    minRows={1}
                    maxRows={4}
                    variant="outlined"
                    value={option.description}
                    onChange={onCommentChange}/>
            </div>
            <DialogActions>
                <Button variant="contained" color="primary" size="small" onClick={onSubmit}>
                    {props.editing ? 'Modifier' : 'Ajouter cette option'}
                </Button>
            </DialogActions>
        </DialogContent>
    </Dialog>
}