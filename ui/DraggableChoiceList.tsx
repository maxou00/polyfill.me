import { typeToReadable } from "../core/form_utils";
import { field_types } from "../core/global";
import styles from "../styles/Home.module.scss";

export function DraggableChoiceList() {

    function onDragStart(ev: React.DragEvent<HTMLLIElement>, m: string) {
        ev.dataTransfer.setData("field-model", m);
    }

    return <div>
        <div>
            <ul className="item_list">
                {
                    field_types.map((c) => {
                        return <li className={styles.choice_item} key={c} draggable onDragStart={(ev) => onDragStart(ev, c)}>{typeToReadable(c)}</li>
                    })
                }
            </ul>
        </div>
    </div>
}