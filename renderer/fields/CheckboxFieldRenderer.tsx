import { Box, Checkbox, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { FieldRendererProps } from ".";

export function CheckboxFieldRenderer(props: FieldRendererProps) {

    return <Box paddingY={1}>
        <Box>
            {
                props.question.options.map((o) => {
                    return <FormControlLabel key={o.value} label={o.value} value={o.value} control={<Checkbox color="primary" />} />
                })
            }
        </Box>
    </Box>
}