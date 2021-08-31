import { Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@material-ui/core";
import { useMemo } from "react";
import { ContentField } from "../engine/fields";
import { DataForm } from "../engine/page";
import { CellRenderer } from "./cells";
import { useFormReportContext } from "./FormReport";

export function FormResponseTable() {
    const responses = useFormReportContext();

    const flattenedFields = useMemo(() => {
        return responses.form.form_content.pages
            .flatMap(
                (page) => page.fields
                    .map(
                        (field) => {
                            return {page: page.key, field}
                        }
                    )
            )
    }, [responses.form]);

    if(!responses) {
        return <></>
    }

    return <div>
        <TableContainer style={{scrollbarWidth:'thin'}}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            responses.form.form_content.pages.map((page) => {
                                return <TableCell key={page.key} colSpan={page.fields.length}>
                                    <Typography variant="h6">{page.title}</Typography>
                                </TableCell>
                            })
                        }
                    </TableRow>
                    <TableRow>
                        {
                            responses.form.form_content.pages.flatMap((page) => page.fields).map((field) => {
                                return <TableCell key={field.key}>
                                    <Tooltip title={<span style={{fontSize: '14px'}}>{field.title}</span>}>
                                        <div style={{ overflow: 'hidden', maxWidth: '250px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                            {field.title}
                                        </div>
                                    </Tooltip>
                                </TableCell>
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        responses.pageData.map((response) => {

                            return <TableRow key={response.id}>
                                {
                                    flattenedFields.map((flat) => {
                                        let page = response.pages.find((p) => p.pageId === flat.page);
                                        let { answer } = page.responses.find((ans) => ans && ans.questionId === flat.field.key);
                                        return <TableCell key={`${response.id}-${page.pageId}-${flat.field.key}`}>
                                            <CellRenderer field={flat.field} answer={answer} />
                                        </TableCell>
                                    })
                                }
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </div>
}