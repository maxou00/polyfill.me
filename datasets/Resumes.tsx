/* eslint-disable @next/next/no-img-element */
import { Box, Button, Card, Paper, Typography } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useMemo } from "react";
import { padZero } from "../core/utils";
import { DataForm } from "../engine/page";
import { useDataset } from "../processing-analysis/helper";
import { useGlobalState } from "../state/selectors"
import { NoTransformButton } from "../ui/styled";
import Image from "next/image";

function SchemaResume(props: { form: DataForm }) {
    const dataset = useDataset(props.form.id, 1);
    const router = useRouter();
    const latestDate = useMemo(() => {
        return (dataset.pageData[0]) ? dataset.pageData[0].createdAt : undefined;
    }, [dataset]);

    return <Box padding={2}>
        <Box paddingY={1}>
            <Typography variant="h2" style={{fontWeight: 'bold'}}>{padZero(dataset.total)}<span style={{ fontSize: '21px', marginLeft: '8px', fontWeight: 'lighter' }}>entrées</span></Typography>
        </Box>
        <Box paddingY={1.5} display="flex" flexDirection="row" alignItems="center" justifyContent="center">
            <Box flexGrow={1}>
                <Typography variant="h5">{props.form.form_content.title}</Typography>
                {latestDate && <span>
                    Dernière création le {new Date(latestDate).toLocaleDateString()} à {new Date(latestDate).toLocaleTimeString()}
                </span>}
            </Box>
            <Box>
                <NoTransformButton
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={() => router.replace(`/datasets/${props.form.id}`)}>Voir le schéma</NoTransformButton>
            </Box>
        </Box>
    </Box>
}

export function Resumes() {
    const globalState = useGlobalState();

    return <div>
        {globalState.forms.length === 0 && <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
            <Box width="180px">
                <img src={"/nodata.svg"} alt="No data" width="100%" />
            </Box>
        </Box>}
        {
            globalState.forms.map((f) => {
                return <Paper style={{ margin: '16px 0px' }} key={f.id}>
                    <SchemaResume form={f} />
                </Paper>
            })
        }
    </div>
}