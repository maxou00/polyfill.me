import { Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@material-ui/core";
import { useMemo } from "react";
import { ContentField } from "../engine/fields";
import { DataForm } from "../engine/page";
import { CellRenderer } from "./cells";
import { useSchemaView } from "./SchemaView";

export function SchemaTable() {
    const responses = useSchemaView();

    const flattenedFields = useMemo(() => {
        return responses.form.form_content.pages
            .flatMap(
                (page) => page.fields
                    .map(
                        (field) => {
                            return { page: page.key, field }
                        }
                    )
            )
    }, [responses.form]);

    if (!responses) {
        return <></>
    }

    return <div>
        <TableContainer style={{ scrollbarWidth: 'thin' }}>
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2}>Dates</TableCell>
                        {
                            responses.form.form_content.pages.map((page) => {
                                return <TableCell key={page.key} colSpan={page.fields.length}>
                                    <Typography variant="h6">{page.title}</Typography>
                                </TableCell>
                            })
                        }
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Tooltip title={<span style={{ fontSize: '14px' }}>Création</span>}>
                                <div style={{ overflow: 'hidden', maxWidth: '250px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                    Création
                                </div>
                            </Tooltip>
                        </TableCell>
                        <TableCell>
                            <Tooltip title={<span style={{ fontSize: '14px' }}>Mise à jour</span>}>
                                <div style={{ overflow: 'hidden', maxWidth: '250px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                    Mise à jour
                                </div>
                            </Tooltip>
                        </TableCell>
                        {
                            responses.form.form_content.pages.flatMap((page) => page.fields).map((field) => {
                                return <TableCell key={field.key}>
                                    <Tooltip title={<span style={{ fontSize: '14px' }}>{field.title}</span>}>
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

                            let created = response.createdAt instanceof Date ? response.createdAt : new Date(Date.parse(response.createdAt as any));
                            let updated = response.updatedAt instanceof Date ? response.updatedAt : new Date(Date.parse(response.updatedAt as any));

                            let createdStr = `${created.toLocaleDateString()} ${created.toLocaleTimeString()}`
                            let updatedStr = response.createdAt !== response.updatedAt ? `${updated.toLocaleDateString()} ${updated.toLocaleTimeString()}` : '-'

                            return <TableRow key={response.id}>
                                <TableCell>
                                    <Tooltip title={<span style={{ fontSize: '14px' }}>{createdStr}</span>}>
                                        <div style={{ overflow: 'hidden', maxWidth: '250px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                            {createdStr}
                                        </div>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>{
                                    <Tooltip title={<span style={{ fontSize: '14px' }}>{updatedStr}</span>}>
                                        <div style={{ overflow: 'hidden', maxWidth: '250px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                            {updatedStr}
                                        </div>
                                    </Tooltip>
                                }
                                </TableCell>
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