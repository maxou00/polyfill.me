import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { DashboardLayout } from "../../dashboard/DashboardLayout";
import { useSchema } from "../../processing-analysis/helper";
import { SchemaView } from "../../processing-analysis/SchemaView";
import { Initializer } from "../../ui/Initializer";

export default function SingleDataset(props) {
    const router = useRouter();
    const schema = useSchema(router.query.id as string);

    return <Initializer redirectToSignin>
        <DashboardLayout>
            <Head>
                <title>{schema ? schema.form_content.title : 'Visualiser un schéma'}</title>
            </Head>
            {schema && <SchemaView form={schema} />}
        </DashboardLayout>
    </Initializer>
}