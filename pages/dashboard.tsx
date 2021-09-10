import { Initializer } from "../ui/Initializer";
//import styles from "../styles/Dashboard.module.scss";
import { DashboardLayout } from "../dashboard/DashboardLayout";
import { Resumes } from "../datasets/Resumes";
import { Box, Container } from "@material-ui/core";
import { NoTransformButton } from "../ui/styled";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { ForceProfileSetup } from "../ui/ForceProfileSetup";

export default function Dashboard() {
    const router = useRouter();
    return <Initializer>
        <ForceProfileSetup>
            <DashboardLayout>
                <Container>
                    <Box>
                        <Resumes />
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
                        <Link href="/editor" passHref>
                            <NoTransformButton
                                size="small"
                                variant="outlined"
                                color="default"
                                startIcon={
                                    <i className="fi-rr-add"></i>
                                }>Créer un nouveau schéma</NoTransformButton>
                        </Link>
                    </Box>
                </Container>
            </DashboardLayout>
        </ForceProfileSetup>
    </Initializer>
}