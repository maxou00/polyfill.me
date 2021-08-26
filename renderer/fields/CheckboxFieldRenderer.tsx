import { Box, Checkbox, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { useMemo } from "react";
import { useCallback } from "react";
import { FieldRendererProps } from ".";

export function CheckboxFieldRenderer(props: FieldRendererProps) {

    const answers = useMemo(() => {
        if (props.response.answer) {
            return props.response.answer;
        }
        return [];
    }, [props.response.answer]);

    const onCheckChange = useCallback((value: string, check: boolean) => {
        let answerIndex = answers.findIndex((a: string) => a === value);
        let cpy = [...answers];

        if (check && answerIndex === -1) {
            cpy.push(value);
        }
        else if (!check && answerIndex > -1) {
            cpy.splice(answerIndex, 1);
        }
        props.onChange(cpy);
    }, [props, answers]);

    return <Box paddingY={1}>
        <Box>
            {
                props.question.options.map((o) => {
                    let isActive = answers.includes(o.value);

                    return <FormControlLabel
                        key={o.value}
                        label={o.value}
                        value={isActive}
                        control={
                            <Checkbox color="primary" />
                        }
                        checked={isActive}
                        onChange={(ev, check) => onCheckChange(o.value, check)} />
                })
            }
        </Box>
    </Box>
}