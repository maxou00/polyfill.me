import { Box, IconButton, MenuItem, Popover, TextField, Typography } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { MdAdd } from "react-icons/md";
import { DataForm } from "../engine/page";
import { FilterChain, LogicalJoin, SingleRowCondition } from "./filtering";
import { ChainRenderer } from "./filtering/ChainRenderer";
import { FilterEntryComposer } from "./filtering/FieldEntryComposer";

export function FilterComposer(props: { schema: DataForm }) {
    const [composerAnchor, setComposerAnchor] = useState<HTMLButtonElement>();
    const [chain, setChain] = useState<FilterChain>();
    const [logic, setLogic] = useState<LogicalJoin>(LogicalJoin.or);

    const onConditionComposed = useCallback((condition: SingleRowCondition) => {
        let next = { ...chain };
        if (chain) {
            next = {
                type: "combined",
                logic,
                left: chain,
                right: condition
            }
        }
        else {
            next = condition;
        }
        setChain(next);
        setComposerAnchor(undefined);
    }, [chain, logic]);

    return <Box>
        {
            chain && <ChainRenderer schema={props.schema} chain={chain} onChange={setChain} />
        }
        <Box paddingY={1} display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start">
            {chain && <TextField value={logic} onChange={(ev) => setLogic(ev.target.value as LogicalJoin)} select size="small" variant="outlined">
                <MenuItem value={LogicalJoin.and}>Et</MenuItem>
                <MenuItem value={LogicalJoin.or}>Ou</MenuItem>
            </TextField>}
            <IconButton onClick={(ev) => setComposerAnchor(ev.currentTarget)}>
                <MdAdd />
            </IconButton>
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
    </Box>
}