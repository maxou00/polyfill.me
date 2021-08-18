import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { MdDone, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { FieldCreators } from "../engine/creators";
import { ContentField } from "../engine/fields";
import { Page } from "../engine/page";
import { appendField, appendPage, setActiveField } from "../state/creator";
import { useEditionState } from "../state/selectors";
import styles from "../styles/PageBuilder.module.scss";
import { FieldRenderer } from "./FieldRenderer";

interface BuilderProps { 
    page: Page;
}

export function PageBuilder(props: BuilderProps) {
    const dispatch = useDispatch();
    const edition = useEditionState();
    const [draggedModel, setDraggedModel] = useState("");

    const onTitleChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        let next = {...props.page};
        next.title = ev.target.value;
        dispatch(appendPage(next));
    },[props]);

    const onDescriptionChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        let next = {...props.page};
        next.description = ev.target.value;
        dispatch(appendPage(next));
    }, [props])

    const onDragOver = useCallback((ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
        setDraggedModel(ev.dataTransfer.getData("field_creator"));
    }, [])

    const onDragExit = useCallback((ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
        setDraggedModel(undefined);
    },[])

    const onDropCaptured = useCallback((ev: React.DragEvent<HTMLElement>) => {
        ev.preventDefault();
        /// add field when dropped
        if (draggedModel && FieldCreators[draggedModel]) {
            dispatch(appendField(props.page.key, FieldCreators[draggedModel]()));
            setDraggedModel(undefined);
        }
    }, [draggedModel, dispatch, props]);

    const onFocusGained = useCallback((fieldId: string) => {
        dispatch(setActiveField(fieldId));
    }, [dispatch]);

    const onFieldChange = useCallback((field: ContentField) => {
        dispatch(appendField(props.page.key, field));
    }, [props, dispatch]);

    return <div onDrop={onDropCaptured} onDragOver={onDragOver} onDragLeave={onDragExit} onDragExit={onDragExit} className={styles.page_builder}>
        <div className={styles.heading_wrapper}>
            <input className={styles.input_title} type="text" placeholder="Titre de cette page" onChange={onTitleChange} value={props.page.title}/>
            <input className={styles.input_description} type="text" placeholder="Votre description de cette page ici." onChange={onDescriptionChange} value={props.page.description}/>
        </div>
        <h4>Questions</h4>
        <div className={styles.fields_wrapper} data-dragging={Boolean(draggedModel)} onDragOver={(ev) => ev.preventDefault()}>
            {
                props.page.fields.map((f) => {
                    return <div onFocus={() => onFocusGained(f.key)} key={f.key} className={styles.single_field} data-active={edition.activeField === f.key}>
                        <FieldRenderer field={f} onChange={onFieldChange}/>
                    </div>
                })
            }
        </div>
    </div>
}