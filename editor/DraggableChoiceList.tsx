import { FieldCreators } from "../engine/creators";
import styles from "../styles/Editor.module.scss";
import names from "../engine/field_names.json";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { appendField } from "../state/creator";
import { useEditionState } from "../state/selectors";
import { useDrag } from "react-dnd";

const FieldCreator = (props: { tag: string, onSimpleClick(): any, onDrop(page: string, tag: string): any }) => {
    
    const [{ isDragging }, drag] = useDrag({
        type: 'field',
        item: {type: 'field', name: props.tag},
        end: (item, monitor) => {
            const result: any = monitor.getDropResult();
            if(result && result.page) {
                props.onDrop(result.page, props.tag);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    const opacity = isDragging ? .4 : 1;
    return <li
        ref={drag}
        className={styles.choice_item}
        onClick={props.onSimpleClick} style={{opacity}}>
        {names[`field_${props.tag}`]}
    </li>
}

export function DraggableChoiceList() {
    const dispatch = useDispatch();
    const edition = useEditionState();

    const onChoiceClick = useCallback((choice: string) => {
        let built = FieldCreators[choice]();
        dispatch(appendField(edition.activePage, built));
    }, [dispatch, edition]);

    const onDrop = useCallback((page: string, fieldTag: string) => {
        dispatch( appendField(page, FieldCreators[fieldTag]()) );
    }, [dispatch]);

    return <div>
        <div>
            <ul className="item_list">
                {
                    Object.keys(FieldCreators).map((k) => {
                        return <FieldCreator 
                            key={k} 
                            tag={k} 
                            onSimpleClick={() => onChoiceClick(k)}
                            onDrop={onDrop}/>
                    })
                }
            </ul>
        </div>
    </div>
}