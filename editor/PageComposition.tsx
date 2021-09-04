import styles from '../styles/PageComposition.module.scss'
import cn from "classnames";
import { MdAdd, MdClose, MdKeyboardArrowDown } from 'react-icons/md';
import { useEditionState, useFillable } from '../state/selectors';
import { useDispatch } from 'react-redux';
import { useCallback, useMemo, useRef, useState } from 'react';
import { initialPage } from '../engine/page';
import { appendPage, deleteField, moveFieldBefore, setActiveField, setActivePage } from '../state/creator';
import names from "../engine/field_names.json";
import { fieldCode } from '../engine/creators';
import { ContentField } from '../engine/fields';
import { useDrag, useDrop } from 'react-dnd';

const SortablePageField = (props: {
    field: ContentField,
    index: number,
    active: boolean,
    onClick(): any,
    onDelete(): any,
    onSwap(oldIndex: number, newPosition: number): any
}) => {
    const ref = useRef<HTMLElement | null>(null);
    const [{ isOver }, drop] = useDrop({
        accept: 'field.li',
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
        type: "field.li",
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
        className={styles.field_item}
        data-active={props.active}
        data-field={props.field.key}>
        <div className={styles.content} onClick={props.onClick}>
            <span onSelect={(ev) => { ev.preventDefault(); return false }} className={styles.title} style={{ cursor: 'none', pointerEvents: 'none' }}>{props.field.title || "Sans titre"}</span>
            <span className={styles.type} style={{ cursor: 'none', pointerEvents: 'none' }}>{names[fieldCode(props.field)]}</span>
        </div>
        <div className={styles.actions}>
            <button onClick={props.onDelete}>
                <MdClose size={18} />
            </button>
        </div>
    </div>
}

const SortableFieldList = (props: { 
    items: ContentField[], 
    active: string, 
    onClick(field: ContentField): any, 
    onDelete(field: ContentField): any,
    onSwap(old: number, nextPosition: number): any
}) => {
    return <ul className={"item_list " + styles.content}>
        {
            props.items.map((f, i) => {
                return <SortablePageField
                    key={f.key+"-"+i}
                    field={f}
                    index={i}
                    active={f.key === props.active}
                    onClick={() => props.onClick(f)}
                    onDelete={() => props.onDelete(f)}
                    onSwap={props.onSwap}/>
            })
        }
    </ul>
}

export function PageComposition() {

    const fillable = useFillable();
    const dispatch = useDispatch();
    const edition = useEditionState();

    const [compositionPanelOpen, setCompositionPanelOpen] = useState(true);

    const activePage = useMemo(() => {
        return fillable.pages.find((p) => p.key === edition.activePage)
    }, [edition.activePage, fillable]);

    const addPage = useCallback(() => {
        dispatch(appendPage(initialPage()))
    }, [dispatch]);

    const setHighlightedField = useCallback((id: string) => {
        dispatch(setActiveField(id));
    }, [dispatch]);

    const moveToPage = useCallback((id: string) => {
        dispatch(setActivePage(id));
    }, [dispatch]);

    const removeField = useCallback((pageId: string, fieldId: string) => {
        alert("delete");
        return dispatch(deleteField(pageId, fieldId));
    }, [dispatch]);

    const onSortEnd = useCallback((oldIndex: number, newIndex: number) => {
        let before = activePage.fields[oldIndex];
        let next = activePage.fields[newIndex];
        if (oldIndex === newIndex) {
            return;
        }

        dispatch(moveFieldBefore(activePage.key, next.key, before.key));
    }, [dispatch, activePage]);

    return <section className={styles.structure_wrapper} data-role="page-composition">
        <div className={cn(styles.structure, styles.structure_pages)}>
            <header>
                <h4>Pages</h4>
                <div className={styles.actions}>
                    <button onClick={addPage}>
                        <MdAdd size={18} />
                    </button>
                </div>
            </header>
            <div className={styles.content_wrapper}>
                <ul className={"item_list " + styles.content}>
                    {
                        fillable.pages.map((p) => {
                            return <li key={p.key} className={styles.page_item} onClick={() => moveToPage(p.key)} data-active={activePage && activePage.key === p.key}>
                                {p.title}
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
        <div aria-expanded={compositionPanelOpen} className={cn(styles.structure, styles.structure_composition)}>
            <header data-role="header">
                <h4>Composition</h4>
                <div className={styles.actions}>
                    <button data-role="toggle" onClick={() => setCompositionPanelOpen(!compositionPanelOpen)}>
                        <MdKeyboardArrowDown size={18} />
                    </button>
                </div>
            </header>
            <div data-role="content" className={styles.content_wrapper}>
                {activePage && <SortableFieldList
                    items={activePage.fields}
                    active={edition.activeField}
                    onClick={(f) => setHighlightedField(f.key)}
                    onDelete={(f) => removeField(activePage.key, f.key)}
                    onSwap={onSortEnd}/>
                }
            </div>
        </div>
    </section>
}