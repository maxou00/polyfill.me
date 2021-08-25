import { Box, Container, Typography } from "@material-ui/core";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Page } from "../engine/page";
import { appendAnswer } from "../state/creator";
import { usePageResponse } from "../state/selectors";
import { FieldRenderer } from "./FieldRenderer";
import { FieldWithMeta } from "./fields/FieldWithMeta";
import styles from "./styles/PageRenderer.module.scss";

const SemiBordered = (props: { text: string }) => {
    return <div className={styles.semiBordered}>
        <Typography variant="h4" className={styles.text}>{props.text}</Typography>
        <span className={styles.border}></span>
    </div>
}
export function PageRenderer(props: { page: Page }) {
    const response = usePageResponse(props.page.key);
    const dispatch = useDispatch();

    const onAnswerChange = useCallback((questionId: string, answer: any) => {
        dispatch(appendAnswer(response.pageId, questionId, answer));
    }, [dispatch, response.pageId]);

    return <Box display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start">
        <SemiBordered text={props.page.title} />
        {props.page.description && <Box marginTop={2}>
            <Typography variant="body1">{props.page.description}</Typography>
        </Box>}
        <Box marginTop={2} width="100%">
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