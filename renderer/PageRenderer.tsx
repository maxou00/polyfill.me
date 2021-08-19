import { Box, Container, Typography } from "@material-ui/core";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Page } from "../engine/page";
import { appendAnswer } from "../state/creator";
import { usePageResponse } from "../state/selectors";
import { FieldRenderer } from "./FieldRenderer";
import { FieldWithMeta } from "./fields/FieldWithMeta";

export function PageRenderer(props: { page: Page }) {
    const response = usePageResponse(props.page.key);
    const dispatch = useDispatch();

    const onAnswerChange = useCallback((questionId: string, answer: any) => {
        dispatch(appendAnswer(response.pageId, questionId, answer));
    }, [dispatch, response.pageId]);

    return <Box>
        <h2>{props.page.title}</h2>
        <Typography variant="body2">{props.page.description}</Typography>
        <Box>
            {
                props.page.fields.map((f) => {
                    let answer = response.responses.find((r) => r.questionId === f.key);
                    return <FieldWithMeta
                        key={f.key}
                        question={f}
                        answer={answer}
                        onChange={(ans) => onAnswerChange(f.key, ans)} />
                })
            }
        </Box>
    </Box>
}