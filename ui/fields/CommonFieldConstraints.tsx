import { FieldEditorProps } from ".";


export function CommonFieldConstraints(props: FieldEditorProps) {
    return <div style={{ width: '100%', display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
        <p style={{ fontSize: "14px" }}>Réponse obligatoire</p>
        <input style={{ width: '18px', marginLeft: "8px" }} type="checkbox" name="" id="" />
    </div>
}