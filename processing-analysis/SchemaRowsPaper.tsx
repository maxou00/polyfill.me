import { Box, ButtonGroup, Dialog, DialogContent, IconButton, Toolbar, Typography } from "@material-ui/core";
import { padZero } from "../core/utils";
import { NoTransformButton } from "../ui/styled";
import { useSchemaView } from "./SchemaView";
import { SchemaTable } from "./SchemaTable";
import { MdSearch } from "react-icons/md";
import { FilterComposer } from "./FilterComposer";
import { useState } from "react";

export function SchemaRowsPaper() {
    const [filterOpen, setFilterOpen] = useState(false);
    const responses = useSchemaView();
    return <Box>
        <Toolbar variant="dense">
            <Box flexGrow={1}>
                <Typography variant="h5">{padZero(responses.total)} Entrées</Typography>
            </Box>
            <Box>
                <IconButton onClick={() => setFilterOpen(true)} style={{ margin: '0px 8px' }}>
                    <MdSearch />
                </IconButton>
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
        <SchemaTable />
        <Dialog fullScreen open={filterOpen} onClose={() => setFilterOpen(false)}>
            <DialogContent>
                <FilterComposer schema={responses.form} />
            </DialogContent>
        </Dialog>
    </Box>
}