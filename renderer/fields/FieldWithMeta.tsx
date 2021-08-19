import { Box, Typography } from "@material-ui/core";
import { FieldRendererProps } from ".";
import { FieldRenderer } from "../FieldRenderer";

export function FieldWithMeta(props: FieldRendererProps) {
    return <Box key={props.question.key}>
        <Box paddingY={1}>
            <Typography variant="h6">{props.question.title}{props.question.required && "*"}</Typography>
            <Typography variant="body2">{props.question.description}</Typography>
        </Box>
        <FieldRenderer {...props} />
    </Box>
}