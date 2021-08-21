import { ChangeEvent, useCallback } from "react"
import styles from "../styles/PageBuilder.module.scss";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { appendField } from "../state/creator";
import Field, { FieldEditorProps } from "./fields";
import names from "../engine/field_names.json";
import { fieldCode } from "../engine/creators";
import { CommonFieldConstraints } from "./fields/CommonFieldConstraints";
import { Divider } from "@material-ui/core";

export function FieldMetadata(props: FieldEditorProps) {
    const onChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        if (ev.target.name === "f_title") {
            props.onChange({ ...props.field, title: ev.target.value })
        }
        else if (ev.target.name === "f_description") {
            props.onChange({ ...props.field, description: ev.target.value })
        }
    }, [props]);

    return <div className={styles.field_metadata}>
        <h4 style={{ margin: '1px 0px' }}>{names[fieldCode(props.field)]}</h4>
        <input className={cn(styles.input, styles.meta_title)} type="text" name="f_title" placeholder="Titre de la question" onChange={onChange} value={props.field.title} />
        <input className={cn(styles.input, styles.meta_desc)} type="text" name="f_description" placeholder="Description de la question" onChange={onChange} value={props.field.description} />
    </div>
}

export function FieldContentRenderer(props: FieldEditorProps) {

    if (props.field.type === "text" && props.field.format === "short") {
        return <Field.ShortText {...props} />
    }
    else if (props.field.type === "text" && props.field.format === "rich") {
        return <Field.RichText {...props} />
    }
    else if (props.field.type === "text" && props.field.format === "paragraph") {
        return <Field.Paragraph {...props} />
    }
    else if (props.field.type === "text" && props.field.format === "email") {
        return <Field.Email {...props} />
    }
    else if (props.field.type === "number" && props.field.format === "date") {
        return <Field.Date {...props} />
    }
    else if (props.field.type === "number" && props.field.format === "time") {
        return <Field.Time {...props} />
    }
    else if (props.field.type === "number" && props.field.format === "datetime") {
        return <Field.DateTime {...props} />
    }
    else if (props.field.type === "number") {
        return <Field.Number {...props} />
    }
    else if (props.field.type === "selection" && props.field.format === "dropdown") {
        return <Field.Dropdown {...props} />
    }
    else if (props.field.type === "selection" && props.field.format === "radio") {
        return <Field.Radio {...props} />
    }
    else if (props.field.type === "selection" && props.field.format === "checkbox") {
        return <Field.Checkbox {...props} />
    }
    else if (props.field.type === "selection" && props.field.format === "chip") {
        return <Field.Chip {...props} />
    }
    else if (props.field.type === "file") {
        return <Field.File {...props} />
    }
    return <></>
}

export function FieldEditorRenderer(props: FieldEditorProps) {

    return <div className={styles.field}>
        <FieldMetadata {...props} />
        <Divider />
        <FieldContentRenderer {...props} />
        <Divider />
        <CommonFieldConstraints {...props} />
    </div>
}