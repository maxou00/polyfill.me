import React, { useRef } from "react";
import { useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { ContentField } from "../engine/fields";
import { Page } from "../engine/page";
import { appendField, appendFieldBefore, appendPage, moveFieldBefore, setActiveField } from "../state/creator";
import { useEditionState } from "../state/selectors";
import styles from "../styles/PageBuilder.module.scss";
import { FieldEditorRenderer } from "./FieldEditorRenderer";
import { FieldEditorProps } from "./fields";

interface BuilderProps {
  page: Page;
}

const FieldRendererWithDnd = (props: FieldEditorProps & { onFocus(): any, active: boolean, index: number, onSwap(oldIndex: number, newIndex: number): any }) => {
  const ref = useRef<HTMLElement | null>(null);

  const [{ isOver }, drop] = useDrop({
    accept: 'field.builder',
    collect(monitor) {
      return {
        isOver: monitor.isOver()
      }
    },
    drop(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index as number;
      const hoverIndex = props.index;

      if (dragIndex === undefined || hoverIndex === undefined) {
        return;
      }

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverRect = ref.current.getBoundingClientRect();
      const middleY = (hoverRect.bottom - hoverRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      let hoverClientY = clientOffset.y - hoverRect.top;

      if (dragIndex < hoverIndex && hoverClientY < middleY) {
        //dragged component has not crossed the middle of the drop target.
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > middleY) {
        return;
      }
      props.onSwap(dragIndex, hoverIndex);
    }
  }, []);

  const [{ isDragging }, drag] = useDrag({
    type: "field.builder",
    item: { index: props.index, name: props.field.key, type: 'field.builder' },
    end: (item, monitor) => {
      const result = monitor.getDropResult();
      //// when dropped
    },
    collect: (monitor) => {
      return { isDragging: monitor.isDragging() }
    }
  })

  drag(drop(ref));

  return <div 
    ref={(el) => ref.current = el} 
    onFocus={props.onFocus} 
    data-field={props.field.key} 
    className={styles.single_field} 
    data-active={props.active} 
    style={{ opacity: isDragging ? .4 : 1, boxShadow: isOver ? '1px 1px 4px #ddd' : 'none'}}>
    <FieldEditorRenderer {...props} />
  </div>
}

export function PageBuilder(props: BuilderProps) {

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ['field'],
    drop: (item, monitor) => ({ page: props.page.key }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
  })

  const dispatch = useDispatch();
  const edition = useEditionState();

  const onTitleChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    let next = { ...props.page };
    next.title = ev.target.value;
    dispatch(appendPage(next));
  }, [props, dispatch]);

  const onDescriptionChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    let next = { ...props.page };
    next.description = ev.target.value;
    dispatch(appendPage(next));
  }, [props, dispatch]);

  const onFocusGained = useCallback((fieldId: string) => {
    dispatch(setActiveField(fieldId));
  }, [dispatch]);

  const onFieldChange = useCallback((field: ContentField) => {
    dispatch(appendField(props.page.key, field));
  }, [props, dispatch]);

  const onSwapFields = useCallback((oldIndex: number, newPosition: number) => {
    let oldField = props.page.fields[oldIndex];
    let newField = props.page.fields[newPosition];
    if (oldField && newField) {
      return dispatch(moveFieldBefore(props.page.key, oldField.key, newField.key));
    }
  }, [props.page, dispatch]);

  return <div className={styles.page_builder}>
    <div className={styles.heading_wrapper}>
      <input className={styles.input_title} type="text" placeholder="Titre de cette page" onChange={onTitleChange} value={props.page.title} />
      <input className={styles.input_description} type="text" placeholder="Votre description de cette page ici." onChange={onDescriptionChange} value={props.page.description} />
    </div>
    <h4>Questions</h4>
    <div
      className={styles.fields_wrapper}
      ref={drop}
      data-dragging={isOver}>
      {
        props.page.fields.map((f, i) => {
          return <FieldRendererWithDnd
            onFocus={() => onFocusGained(f.key)}
            active={edition.activeField === f.key}
            key={f.key + "-" + i}
            field={f}
            index={i}
            onChange={onFieldChange}
            onSwap={onSwapFields} />
        })
      }
    </div>
  </div>
}