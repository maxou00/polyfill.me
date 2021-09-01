import { Box, Input, InputBase, MenuItem } from "@material-ui/core";
import { useMemo } from "react";
import { ContentField } from "../engine/fields";
import { useEditionState, useFillable } from "../state/selectors";
import { NoTransformButton } from "../ui/styled";

export function ExtendedFieldMetaEditor() {
    const fillable = useFillable();
    const edition = useEditionState();

    const activeField = useMemo(() => {
        let activePage = fillable.pages.find((p) => p.key === edition.activePage) || fillable.pages[0];
        if (activePage) {
            return activePage.fields.find((f) => f.key === edition.activeField) || activePage.fields[0];
        }
    }, [fillable.pages, edition.activeField, edition.activePage]);

    return <div>
        <Box padding={.2} paddingY={1}>
            <label style={{ margin: '8px 0px', width: '100%', overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{activeField.title}</label>
        </Box>
        <Box padding={.5} display="flex" flexDirection="column" alignItems="flex-start" justifyContent="flex-start">
            <label style={{ margin: '8px 0px' }}>Identifiant du champ</label>
            <InputBase style={{ border: '1px solid #ddd', padding: '0px 4px', height: '34px' }} fullWidth value={activeField.key} />
        </Box>
        <Box padding={.5} display="flex" flexDirection="column" alignItems="flex-start" justifyContent="flex-start">
            <label style={{ margin: '8px 0px' }}>Déplacer vers</label>
            <select onSelect={(ev) => { }} style={{ border: '1px solid #ddd', padding: '0px 4px', height: '34px', width: '100%' }}>
                {
                    fillable.pages.filter((p) => p.key !== edition.activePage).map((p) => {
                        return <option key={p.key} value={p.key}>{p.title}</option>
                    })
                }
            </select>
            <Box width="100%" paddingY={.5} display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
                <NoTransformButton variant="outlined" color="default" size="small">Déplacer</NoTransformButton>
            </Box>
        </Box>
    </div>
}