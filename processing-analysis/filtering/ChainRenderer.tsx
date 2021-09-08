import { DataForm } from "../../engine/page";
import { FilterChain, LogicalJoin, SingleRowCondition } from '.';
import { useCallback, useMemo, useState } from "react";
import { Box, Typography, StepConnector, StepContent, TextField, MenuItem, IconButton, Popover } from "@material-ui/core";
import { MdAdd, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FilterEntryComposer } from "./FieldEntryComposer";
import { randomColour } from "../../core/colours";

function SingleNodeRenderer(props: { chain: SingleRowCondition, schema: DataForm }) {

    const selectedPage = useMemo(() => {
        return props.schema.form_content.pages.find((p) => p.key === props.chain.page);
    }, [props]);

    const selectedField = useMemo(() => {
        if (!selectedPage) return;
        return selectedPage.fields.find((f) => f.key === props.chain.field);
    }, [props, selectedPage]);

    return <Box padding={.5} style={{border: '1px dashed #ddd', borderRadius: '2px'}}>
        <Typography variant="body1">{selectedPage.title} <i className="fi-rr-arrow-right" /> {selectedField.title}</Typography>
        <Typography variant="body2">{props.chain.operation} {props.chain.value}</Typography>
    </Box>

}

export function ChainRenderer(props: { schema: DataForm, chain: FilterChain, onChange(nextChain: FilterChain): any }) {
    const [logic, setLogic] = useState<LogicalJoin>(LogicalJoin.or);
    const [composerAnchor, setComposerAnchor] = useState<HTMLButtonElement>();

    const onConditionComposed = useCallback((condition: SingleRowCondition) => {
        let next = { ...props.chain };
        if (props.chain) {
            next = {
                type: "combined",
                logic,
                left: next,
                right: condition
            }
        }
        else {
            next = condition;
        }
        props.onChange(next);
        setComposerAnchor(undefined);
    }, [logic, props]);


    const onLeftChange = useCallback((left: FilterChain) => {
        let next = { ...props.chain };
        if (next && next.type === "combined") {
            next.left = left;
            props.onChange(next);
        }
    }, [props]);

    const onRightChange = useCallback((right: FilterChain) => {
        let next = { ...props.chain };
        if (next && next.type === "combined") {
            next.right = right;
            props.onChange(next);
        }
    }, [props]);

    return <Box padding={1} style={{ border: `1px solid ${randomColour()}`, borderRadius: '4px' }}>
        {props.chain.type === "single" && <SingleNodeRenderer chain={props.chain} schema={props.schema} />}
        {props.chain.type === "combined" && <>
            <ChainRenderer schema={props.schema} chain={props.chain.left} onChange={onLeftChange} />
            <Box
                component="span"
                marginLeft={2}
                fontSize="16px"
                fontWeight="bold">
                {props.chain.logic}
            </Box>
            <ChainRenderer schema={props.schema} chain={props.chain.right} onChange={onRightChange} />
        </>}
        <Box paddingY={1} display="flex" flexDirection="row"alignItems="center" justifyContent="flex-start">
            <TextField value={logic} onChange={(ev) => setLogic(ev.target.value as LogicalJoin)} select size="small" variant="outlined">
                <MenuItem value={LogicalJoin.and}>Et</MenuItem>
                <MenuItem value={LogicalJoin.or}>Ou</MenuItem>
            </TextField>
            <Box marginLeft={1}>
                <IconButton onClick={(ev) => setComposerAnchor(ev.currentTarget)} size="small">
                    <MdAdd size={18} />
                </IconButton>
            </Box>
        </Box>
        <Popover
            elevation={1}
            open={Boolean(composerAnchor)}
            onClose={() => setComposerAnchor(undefined)}
            anchorEl={composerAnchor}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}>
            <Box maxWidth="320px" padding={2}>
                <FilterEntryComposer schema={props.schema} onCompose={onConditionComposed} />
            </Box>
        </Popover>
    </Box>
}