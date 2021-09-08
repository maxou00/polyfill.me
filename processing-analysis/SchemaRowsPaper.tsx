import { Box, ButtonGroup, Dialog, DialogContent, DialogTitle, IconButton, Toolbar, Typography } from "@material-ui/core";
import { padZero } from "../core/utils";
import { NoTransformButton } from "../ui/styled";
import { useSchemaView } from "./SchemaView";
import { SchemaTable } from "./SchemaTable";
import { MdClose, MdSearch } from "react-icons/md";
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
            <DialogTitle>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Box paddingY={2}>
                        <Typography variant="h6">Composer un filtre</Typography>
                    </Box>
                    <IconButton size="small" onClick={() => setFilterOpen(false)}>
                        <MdClose />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <FilterComposer schema={responses.form} />
            </DialogContent>
        </Dialog>
    </Box>
}