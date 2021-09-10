import { Box, IconButton, MenuItem, Popover, TextField, Typography } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { MdAdd } from "react-icons/md";
import { DataForm } from "../engine/page";
import { NoTransformButton } from "../ui/styled";
import { FilterChain, LogicalJoin, SingleRowCondition } from "./filtering";
import { ChainRenderer } from "./filtering/ChainRenderer";
import { FilterEntryComposer } from "./filtering/FieldEntryComposer";
import { SaveFilter } from "./SaveFilter";

export function FilterComposer(props: { schema: DataForm }) {
    const [composerAnchor, setComposerAnchor] = useState<HTMLButtonElement>();
    const [saveFilterAnchor, setSaveFilterAnchor] = useState<HTMLButtonElement>();

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
            <Box marginLeft={1}>
                <NoTransformButton
                    variant="outlined"
                    color="default"
                    endIcon={<MdAdd />}
                    onClick={(ev) => setComposerAnchor(ev.currentTarget)}>
                    Ajouter une condition
                </NoTransformButton>
            </Box>
            <Popover
                elevation={1}
                open={Boolean(composerAnchor)}
                onClose={() => setComposerAnchor(undefined)}
                anchorEl={composerAnchor}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}>
                <Box minWidth="3220px" padding={2}>
                    <FilterEntryComposer schema={props.schema} onCompose={onConditionComposed} />
                </Box>
            </Popover>
        </Box>
        {chain && <Box>
            <NoTransformButton
                variant="outlined"
                color="default"
                onClick={(ev) => setSaveFilterAnchor(ev.currentTarget)}>
                Sauvegarder le modèle
            </NoTransformButton>
            <Popover
                elevation={1}
                open={Boolean(saveFilterAnchor)}
                onClose={() => setSaveFilterAnchor(undefined)}
                anchorEl={saveFilterAnchor}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}>
                <Box maxWidth="320px" padding={2}>
                    <SaveFilter schema={props.schema} filter={chain} onSaved={(f) => setSaveFilterAnchor(undefined)} />
                </Box>
            </Popover>
        </Box>}
    </Box>
}