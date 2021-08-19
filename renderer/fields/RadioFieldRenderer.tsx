import { Box, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { FieldRendererProps } from ".";

export function RadioFieldRenderer(props: FieldRendererProps) {

    return <Box paddingY={1}>
        <RadioGroup>
            {
                props.question.options.map((o) => {
                    return <FormControlLabel key={o.value} label={o.value} value={o.value} control={<Radio color="primary" />} />
                })
            }
        </RadioGroup>
    </Box>
}