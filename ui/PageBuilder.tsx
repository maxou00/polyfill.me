import React from "react";
import { useState } from "react";
import { MdDone, MdEdit } from "react-icons/md";
import FieldEngine from "../core/FieldEngine";
import { typeToEngine } from "../core/mutations";
import { Page } from "../core/Page";
import styles from "../styles/PageBuilder.module.scss";
import { FieldRenderer } from "./FieldRender";

interface BuilderProps { 
    page: Page;
    onChange(next: Page): any 
    fieldToHighlight: string
}

export function PageBuilder(props: BuilderProps) {
    const [draggedModel, setDraggedModel] = useState("");

    function onTitleChange(ev: React.ChangeEvent<HTMLInputElement>) {
        props.onChange(props.page.setTitle(ev.target.value))
        console.log(ev.target.value)
    }

    function onDescriptionChange(ev: React.ChangeEvent<HTMLInputElement>) {
        props.onChange(props.page.setDescription(ev.target.value))
    }

    function onDragOver(ev: React.DragEvent<HTMLDivElement>) {
        ev.preventDefault();
        setDraggedModel(ev.dataTransfer.getData("field-model"));
    }

    function onDragExit(ev: React.DragEvent<HTMLDivElement>) {
        ev.preventDefault();
        setDraggedModel(undefined);
    }

    function onDropCaptured(ev: React.DragEvent<HTMLElement>) {
        ev.preventDefault();
        /// add field when dropped
        if (draggedModel) {
            let engine = typeToEngine(draggedModel);
            props.onChange(props.page.addField(engine));
            setDraggedModel(undefined);
        }
    }

    function onFieldChange(f: FieldEngine) {
        props.onChange(props.page.updateField(f))
    }

    return <div onDrop={onDropCaptured} onDragOver={onDragOver} onDragLeave={onDragExit} onDragExit={onDragExit} className={styles.page_builder}>
        <div className={styles.heading_wrapper}>
            <input className={styles.input_title} type="text" placeholder="Titre de cette page" onChange={onTitleChange} value={props.page.title}/>
            <input className={styles.input_description} type="text" placeholder="Votre description de cette page ici." onChange={onDescriptionChange} value={props.page.description}/>
        </div>
        <h4>Questions</h4>
        <div className={styles.fields_wrapper} data-dragging={Boolean(draggedModel)} onDragOver={(ev) => ev.preventDefault()}>
            {
                props.page.fields.map((f) => {
                    return <div key={f.key} className={styles.single_field} data-active={props.fieldToHighlight === f.key}>
                        <FieldRenderer field={f} onChange={onFieldChange} />
                    </div>
                })
            }
        </div>
    </div>
}