import { Box, IconButton, Typography } from "@material-ui/core";
import { blue, grey, indigo } from "@material-ui/core/colors";
import shadows from "@material-ui/core/styles/shadows";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { useMemo } from "react";
import { ChangeEvent, useCallback } from "react";
import { useState } from "react";
import { useRef } from "react";
import { MdAdd, MdClose, MdFileUpload, MdPlusOne } from "react-icons/md";
import { FcFile } from "react-icons/fc";

const styles: { [key: string]: CSSProperties } = {
    dropZone: {
        margin: '4px 8px',
        borderRadius: '4px',
        border: `1px solid ${indigo[100]}`,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '24px'
    },
    fileRenderer: {
        width: '86px',
        height: 'auto',
        objectFit: 'contain',
        position: 'relative',
    },
    iconClose: {
        background: 'white',
        position: 'absolute',
        top: '0',
        right: '0',
        transform: 'translate(50%, -50%)',
    }
}

interface FileInputProps {
    maxFileCount?: number;
    accept: string | string[];
    files: File[];
    onChange?(files: File[]): any;
}

export function FileInput(props: FileInputProps) {
    const { files } = props;
    const hiddenInput = useRef<HTMLInputElement>();

    const setFiles = useCallback((next: File[]) => {
        if(props.onChange) {
            props.onChange(next);
        }
    }, [props]);

    const onAppendFile = useCallback(() => {
        if (hiddenInput.current) {
            hiddenInput.current.click();
        }
    }, [hiddenInput]);

    const onInputChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let inputFiles = [...files];
        for (let i = 0; i < ev.target.files.length; i++) {
            if(props.maxFileCount > inputFiles.length) {
                inputFiles.push(ev.target.files.item(i));
            }
            else {
                break;
            }
        }
        setFiles(inputFiles);
    },[files, setFiles, props]);

    const onRemoveFile = useCallback((f: File) => {
        let next = files.filter((file) => file !== f);
        setFiles(next);
    },[files, setFiles]);

    return <Box>
        <Typography variant="h6"></Typography>
        <Box style={styles.dropZone}>
            {files.length === 0 && <Box onClick={onAppendFile}>
                <MdFileUpload size={64} color={indigo[300]} />
            </Box>
            }
            {
                files.map((f, i) => {
                    return <Box margin={2} key={`${f.name}-${i}`}>
                        <RenderFile file={f} onDelete={() => onRemoveFile(f)} />
                    </Box>
                })
            }
            {files.length > 0 && files.length < props.maxFileCount && <IconButton color="primary" onClick={onAppendFile}>
                <MdAdd size={18} />
            </IconButton>}
        </Box>
        <input multiple={props.maxFileCount > 1} accept={ (typeof props.accept === "string") ? props.accept : props.accept.join(",")} type="file" hidden ref={hiddenInput} onChange={onInputChange} />
    </Box>
}


interface RenderProps {
    file: File;
    onDelete?(): any;
}

function RenderFile(props: RenderProps) {

    const url = useMemo(() => {
        if (!props.file.type.match("^image")) {
            return "";
        }
        return URL.createObjectURL(props.file)
    }, [props]);

    return <Box style={styles.fileRenderer}>
        {/* eslint-disable @next/next/no-img-element */}
        {url && <img src={url} width="100%" alt={props.file.name} />}
        {!url && <Box padding={2}>
            <FcFile size={40} />
        </Box>}
        <Box marginY={.5}>
            <Typography variant="body2" style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.file.name}</Typography>
        </Box>
        {props.onDelete && <IconButton size="small" style={styles.iconClose} onClick={props.onDelete}>
            <MdClose size={16} />
        </IconButton>}
    </Box>
}