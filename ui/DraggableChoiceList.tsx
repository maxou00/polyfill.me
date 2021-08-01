import { FieldCreators } from "../engine/creators";
import styles from "../styles/Home.module.scss";
import names from "../engine/field_names.json";

export function DraggableChoiceList() {

    function onDragStart(ev: React.DragEvent<HTMLLIElement>, creator: string) {
        ev.dataTransfer.setData("field_creator", creator);
    }

    return <div>
        <div>
            <ul className="item_list">
                {
                    Object.keys(FieldCreators).map((k) => {
                        return <li className={styles.choice_item} key={k} draggable onDragStart={(ev) => onDragStart(ev, k)}>{names[`field_${k}`]}</li>
                    })
                }
            </ul>
        </div>
    </div>
}