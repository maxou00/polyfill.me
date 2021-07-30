import { ChangeEvent, useCallback } from "react"
import FieldEngine from "../core/FieldEngine"
import styles from "../styles/PageBuilder.module.scss";
import cn from "classnames";

interface FieldEditorProps {
    field: FieldEngine;
    onChange(engine: FieldEngine) : any;
}

export function FieldMetadata(props: FieldEditorProps) {
    
    const onChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        
        if(ev.target.name === "f_title") {
            props.onChange(props.field.setTitle(ev.target.value));
        }
        else if(ev.target.name === "f_description") {
            props.onChange(props.field.setDescription(ev.target.value));
        }

    }, [props]);

    return <div>
        <input className={cn(styles.input, styles.field_title)} type="text" name="f_title" placeholder="Titre de la question" onChange={onChange} value={props.field.title}/>
        <input className={cn(styles.input, styles.field_desc)} type="text" name="f_description" placeholder="Description de la question" onChange={onChange} value={props.field.description} />
    </div>
}

export function FieldRenderer(props: FieldEditorProps) {
    return <div className={styles.field}>
        <FieldMetadata {...props}/>
    </div>
}