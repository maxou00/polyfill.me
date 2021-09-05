import { Box, Grid, MenuItem, Popover, TextField, Typography } from "@material-ui/core";
import React, { ChangeEvent, useCallback, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ContentField } from "../engine/fields";
import { DataForm, Page } from "../engine/page";
import { NoTransformButton } from "../ui/styled";
import { FieldConditionComposer } from "./FieldConditionComposer";

const FilterEntryComposer = (props: { schema: DataForm }) => {
    const [pagePickerAnchor, setPagePickerAnchor] = useState<HTMLElement>();
    const [fieldPickerAnchor, setFieldPickerAnchor] = useState<HTMLElement>();

    const [selectedPage, setSelectedPage] = useState<Page>(props.schema.form_content.pages[0]);
    const [selectedField, setSelectedField] = useState<ContentField>(props.schema.form_content.pages[0].fields[0]);

    const onPageChange = useCallback((p: Page) => {
        setSelectedPage(p);
        setSelectedField(p.fields[0]);
        setPagePickerAnchor(undefined);
    }, []);

    const onFieldChange = useCallback((p: ContentField) => {
        setSelectedField(p);
        setFieldPickerAnchor(undefined);
    }, []);

    return <Box>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Typography variant="h6">Page</Typography>
                <NoTransformButton
                    variant="outlined"
                    color="default"
                    fullWidth
                    endIcon={<MdKeyboardArrowDown />}
                    onClick={(ev) => setPagePickerAnchor(ev.currentTarget)}>
                    {selectedPage ? selectedPage.title : 'Choisir une page du schéma'}
                </NoTransformButton>
                <Popover
                    anchorEl={pagePickerAnchor}
                    open={Boolean(pagePickerAnchor)}
                    onClose={() => setPagePickerAnchor(undefined)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}>
                    {
                        props.schema.form_content.pages.map((page) => {
                            return <MenuItem value={page.key} key={page.key} onClick={() => onPageChange(page)}>{page.title}</MenuItem>
                        })
                    }
                </Popover>
            </Grid>
            {selectedPage && <Grid item xs={6}>
                <Typography variant="h6">Champ</Typography>
                <NoTransformButton
                    variant="outlined"
                    color="default"
                    fullWidth
                    endIcon={<MdKeyboardArrowDown />}
                    onClick={(ev) => setFieldPickerAnchor(ev.currentTarget)}>
                    <span style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', width: '100%', flexGrow: 1 }}>{selectedField ? selectedField.title : 'Choisir un champ'}</span>
                </NoTransformButton>
                <Popover
                    anchorEl={fieldPickerAnchor}
                    open={Boolean(fieldPickerAnchor)}
                    onClose={() => setFieldPickerAnchor(undefined)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}>
                    {
                        selectedPage.fields.map((field) => {
                            return <MenuItem value={field.key} key={field.key} onClick={() => onFieldChange(field)}>{field.title}</MenuItem>
                        })
                    }
                </Popover>
            </Grid>}
            <Grid item xs={12}>
                <FieldConditionComposer field={selectedField} page={setSelectedPage} />
            </Grid>
            <Grid item xs={12}>
                <NoTransformButton variant="contained" color="primary" disableElevation>Ajouter le filtre</NoTransformButton>
            </Grid>
        </Grid>
    </Box>
}

export function FilterComposer(props: { schema: DataForm }) {
    const filters = useState([]);
    return <Box>
        <Box paddingY={2}>
            <Typography variant="h6">Composer un filtre</Typography>
        </Box>
        <FilterEntryComposer schema={props.schema} />
    </Box>
}