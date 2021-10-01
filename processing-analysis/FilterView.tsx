import { Box, ButtonGroup, Divider, Grid, Toolbar, Typography } from "@material-ui/core";
import { useState } from "react";
import { MdSort } from "react-icons/md";
import { padZero } from "../core/utils";
import { DataForm } from "../engine/page";
import { NoTransformButton } from "../ui/styled";
import { DataFormFilter } from "./filtering";
import { useFilterDataset } from "./helper";
import { SchemaRowsPaper } from "./SchemaRowsPaper";
import { SchemaTable } from "./SchemaTable";

interface Props {
    schema: DataForm;
    filter: DataFormFilter;
}

export function FilterView(props: Props) {
    const [pageSize, setPageSize] = useState(25);
    const responses = useFilterDataset(props.schema.id, props.filter.id, pageSize); 

    return <Box>
        
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box padding={2} display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start">
                    <Box marginX={1}>
                        <MdSort size={24} />
                    </Box>
                    <Typography variant="h6">{props.filter.label}</Typography>
                </Box>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Box>
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
                    <SchemaTable dataset={responses.pageData} schema={props.schema} />
                </Box>
            </Grid>
        </Grid>
    </Box>
}