/* eslint-disable @next/next/no-img-element */
import { Box } from "@material-ui/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { supaClient } from "../../core/utils";
import { DataForm } from "../../engine/page";
import { FormRenderer } from "../../renderer/FormRenderer";
import { setCollectionForm } from "../../state/creator";
import { useCollectionForm } from "../../state/selectors";
import { NoTransformButton } from "../../ui/styled";

export default function CollectionPage(props: { form?: DataForm, id: string }) {

    const dispatch = useDispatch();
    const form = useCollectionForm();

    useEffect(() => {
        if (props.form) {
            dispatch(setCollectionForm(props.form));
        }
    }, [props, dispatch]);

    if (!props.form) {
        return <Box width="100vw" height="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Box width="240px">
                <img src="/404.svg" alt="404" width="100%" />
            </Box>
            <Box marginY={2}>
                <Link href="/" passHref>
                    <NoTransformButton variant="outlined" color='default'>Retour à la page principale.</NoTransformButton>
                </Link>
            </Box>
        </Box>
    }
    else if (!form) {
        return <></>
    }
    return <div>
        <Head>
            <title>{props.form.form_content.title}</title>
        </Head>
        <FormRenderer preview={false} />
    </div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let id = context.params.id as string;
    return supaClient
        .from<DataForm>("forms")
        .select("id,form_content,createdAt,updatedAt, allowAnonymousFill")
        .eq("id", id)
        .eq("allowAnonymousFill", true)
        .single()
        .then((value) => {
            if (value.error) {
                return {
                    props: {}
                }
            }
            return {
                props: {
                    form: value.body,
                }
            }
        })
}