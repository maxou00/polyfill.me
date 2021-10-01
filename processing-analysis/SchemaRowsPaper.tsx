import { Box, ButtonGroup, Container, Dialog, DialogContent, DialogTitle, IconButton, Toolbar, Typography } from "@material-ui/core";
import { padZero } from "../core/utils";
import { NoTransformButton } from "../ui/styled";
import { useSchemaView } from "./SchemaView";
import { SchemaTable } from "./SchemaTable";
import { MdClose, MdSearch } from "react-icons/md";
import { FilterComposer } from "./FilterComposer";
import { useState } from "react";

export function SchemaRowsPaper() {
    const responses = useSchemaView();
    return <Box>
        <Toolbar variant="dense">
            <Box flexGrow={1}>
                <Typography variant="h5">{padZero(responses.total)} Entrées</Typography>
            </Box>
            <Box>
                <ButtonGroup variant="outlined" color='default' size='small'>
                    <NoTransformButton>
                        {responses.itemPerPage} / Page
                    </NoTransformButton>
                    <NoTransformButton>
                        <span>Page {responses.pageIndex + 1}/{responses.pageCount}</span>
                    </NoTransformButton>
                    <NoTransformButton disabled={responses.pageCount <= 1}>Préc.</NoTransformButton>
                    <NoTransformButton disabled={responses.pageCount <= 1}>suivant.</NoTransformButton>
                </ButtonGroup>
            </Box>
        </Toolbar>
        <SchemaTable dataset={responses.pageData} schema={responses.form} />
    </Box>
}