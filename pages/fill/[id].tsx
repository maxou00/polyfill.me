import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { supaClient } from "../../core/utils";
import { DataForm } from "../../engine/page";
import { FormRenderer } from "../../renderer/FormRenderer";
import { setCollectionForm } from "../../state/creator";
import { useCollectionForm } from "../../state/selectors";

export default function CollectionPage(props: {form?: DataForm, id: string}) {
    
    const dispatch = useDispatch();
    const form = useCollectionForm();

    useEffect(() => {
        if(props.form) {
            dispatch(setCollectionForm(props.form));
        }
    }, [props, dispatch]);

    if(!props.form) {
        return <div>
            no form found with this id.
        </div>
    }
    else if(!form) {
        return <></>
    }
    return <div>
        <Head>
            <title>{props.form.form_content.title}</title>
        </Head>
        <FormRenderer preview={false}/>
    </div>
}

export const getServerSideProps: GetServerSideProps =  async(context) => {
    let id = context.params.id as string;
    return supaClient
        .from<DataForm>("forms")
        .select("id,form_content,createdAt,updatedAt, allowAnonymousFill")
        .eq("id", id)
        .single()
        .then((value) => {
            if(value.error) {
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