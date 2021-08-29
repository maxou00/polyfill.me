import { Box } from "@material-ui/core";
import { useMemo } from "react";
import { useCallback } from "react";
import { FieldRendererProps } from ".";
import { Field, FileConstraints } from "../../engine/fields";
import { FileInput } from "../../ui/FileInput";

export function FileFieldRenderer(props: FieldRendererProps<Field<FileConstraints>>) {

    const realFormats = useMemo(() => {
        let formats = props.question.formats;
        return formats.map((f) => {
            if(f === "image") {
                return "image/*";
            }
            if(f === "audio") {
                return "audio/*";
            }
            if(f === "video") {
                return "video/*";
            }
            if(f === "document") {
                return "application/*"
            }
            return "*/*"
        })
    }, [props]);

    const onFilesChange = useCallback((files: File[]) => {
        props.onChange(files);
    }, [props]);

    return <Box paddingY={1}>
        <FileInput 
            maxFileCount={props.question.maxCount || 1}
            accept={realFormats}
            onChange={onFilesChange}
            files={props.response.answer || []}/>
    </Box>
}