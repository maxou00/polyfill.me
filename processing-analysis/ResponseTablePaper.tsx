import { Box, ButtonGroup, Toolbar, Typography } from "@material-ui/core";
import { padZero } from "../core/utils";
import { NoTransformButton } from "../ui/styled";
import { useFormReportContext } from "./FormReport";
import { FormResponseTable } from "./FormResponseTable";

export function ResponseTablePaper() {
    const responses = useFormReportContext();
    return <Box>
        <Toolbar variant="dense">
            <Box flexGrow={1}>
                <Typography variant="h5">{padZero(responses.total)} Réponses</Typography>
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
        <FormResponseTable />
    </Box>
}