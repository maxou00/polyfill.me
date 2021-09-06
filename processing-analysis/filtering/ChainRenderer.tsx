import { DataForm } from "../../engine/page";
import { FilterChain, SingleRowCondition } from '.';
import { useMemo } from "react";
import { Box, Typography } from "@material-ui/core";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function SingleNodeRenderer(props: { chain: SingleRowCondition, schema: DataForm }) {

    const selectedPage = useMemo(() => {
        return props.schema.form_content.pages.find((p) => p.key === props.chain.page);
    }, [props]);

    const selectedField = useMemo(() => {
        if (!selectedPage) return;
        return selectedPage.fields.find((f) => f.key === props.chain.field);
    }, [props, selectedPage]);

    return <Box padding={2}>
        <Typography variant="body1">{selectedPage.title}  <i className="fi-rr-arrow-right"/> {selectedField.title}</Typography>
        <Typography variant="body2">{props.chain.operation} {props.chain.value}</Typography>
    </Box>

}

export function ChainRenderer(props: { chain: FilterChain, schema: DataForm }) {
    if (props.chain.type === "single") {
        return <SingleNodeRenderer chain={props.chain} schema={props.schema} />
    }
    else {
        return <>
            <ChainRenderer schema={props.schema} chain={props.chain.left} />
            <Box component="span" padding={2} fontSize="16px" fontWeight="bold">
                {props.chain.logic}
            </Box>
            <ChainRenderer schema={props.schema} chain={props.chain.right} />
        </>
    }
}