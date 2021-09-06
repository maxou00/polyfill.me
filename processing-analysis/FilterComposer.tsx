import { Box, FormControlLabel, Grid, IconButton, MenuItem, Popover, Switch, TextField, Typography } from "@material-ui/core";
import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import { MdAdd, MdDone } from "react-icons/md";
import { DataForm } from "../engine/page";
import { NoTransformButton } from "../ui/styled";
import { DataOperation, FilterChain, LogicalJoin, SingleRowCondition } from "./filtering";
import { ChainRenderer } from "./filtering/ChainRenderer";

export const FieldConditionComposer = (props: { condition: SingleRowCondition, onChange(condition: SingleRowCondition): any }) => {

    const onNegated = useCallback((check: boolean) => {
        let copy = { ...props.condition };
        copy.negated = check;
        props.onChange(copy);
    }, [props]);


    const onOperationChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let copy = { ...props.condition };
        copy.operation = ev.currentTarget.value as DataOperation;
        props.onChange(copy);
    }, [props]);

    const onReferenceChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let copy = { ...props.condition };
        copy.value = ev.currentTarget.value;
        props.onChange(copy);
    }, [props]);

    return <Box>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h6">Condition</Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    select
                    fullWidth
                    value={props.condition.operation}
                    onChange={onOperationChange}>

                    <MenuItem value="eq">Egalité</MenuItem>
                    <MenuItem value="regex">Correspondance</MenuItem>
                    <MenuItem value="contain">Contenance</MenuItem>
                    <MenuItem value="startWith">Préfixe</MenuItem>
                    <MenuItem value="endWith">Suffixe</MenuItem>
                    <MenuItem value="gt">Stricte supériorité</MenuItem>
                    <MenuItem value="gte">Supériorité ou égalité</MenuItem>
                    <MenuItem value="lt">Stricte infériorité</MenuItem>
                    <MenuItem value="lte">Infériorité ou égalité</MenuItem>

                </TextField>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
                    <FormControlLabel
                        checked={props.condition.negated}
                        onChange={(ev, c) => onNegated(c)}
                        control={<Switch color="primary" />}
                        label="Recherche négative"
                        labelPlacement="start" />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Valeur de référence</Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={props.condition.value}
                    onChange={onReferenceChange} />
            </Grid>
        </Grid>
    </Box>
}

const FilterEntryComposer = (props: { schema: DataForm, onCompose(condition: SingleRowCondition): any }) => {
    const [condition, setCondition] = useState<SingleRowCondition>(
        {
            page: props.schema.form_content.pages[0].key,
            field: props.schema.form_content.pages[0].fields[0].key,
            type: "single",
            value: "",
            operation: DataOperation.eq,
            negated: false
        }
    );

    const selectedPage = useMemo(() => {
        return props.schema.form_content.pages.find((p) => p.key === condition.page);
    }, [props.schema, condition]);

    const selectedField = useMemo(() => {
        const page = props.schema.form_content.pages.find((p) => p.key === condition.page);
        if (!page) return;
        return page.fields.find((f) => f.key === condition.field);
    }, [condition, props.schema]);

    const onPageChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let copy = { ...condition };
        copy.page = ev.target.value;
        copy.field = props.schema.form_content.pages.find((p) => p.key === copy.page).fields[0].key;
        setCondition(copy);
    }, [condition, props]);

    const onFieldChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        let copy = { ...condition };
        copy.field = ev.target.value;
        setCondition(copy);
    }, [condition]);

    const onSubmit = useCallback(() => {
        if (condition) {
            props.onCompose(condition);
        }
    }, [props, condition])

    return <Box>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h6">Page</Typography>
                <TextField
                    value={condition.page}
                    variant="outlined"
                    size="small"
                    select
                    fullWidth
                    onChange={onPageChange}>
                    {
                        props.schema.form_content.pages.map((page) => {
                            return <MenuItem value={page.key} key={page.key}>{page.title}</MenuItem>
                        })
                    }
                </TextField>
            </Grid>
            {condition.page && <Grid item xs={12}>
                <Typography variant="h6">Champ</Typography>
                <TextField
                    value={condition.field}
                    variant="outlined"
                    size="small"
                    select
                    fullWidth
                    onChange={onFieldChange}>
                    {
                        selectedPage.fields.map((field) => {
                            return <MenuItem value={field.key} key={field.key}>{field.title}</MenuItem>
                        })
                    }
                </TextField>
            </Grid>}
            <Grid item xs={12}>
                <FieldConditionComposer condition={condition} onChange={setCondition} />
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
                    <NoTransformButton
                        onClick={onSubmit}
                        variant="contained"
                        color="primary"
                        disableElevation
                        startIcon={<MdDone />}>
                        OK
                    </NoTransformButton>
                </Box>
            </Grid>
        </Grid>
    </Box>
}

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
        <Box paddingY={2}>
            <Typography variant="h6">Composer un filtre</Typography>
        </Box>
        {
            chain && <ChainRenderer schema={props.schema} chain={chain}/>
        }
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
}