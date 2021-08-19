import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { supaClient } from "../../core/utils";
import { DataForm } from "../../engine/page";
import { FormRenderer } from "../../renderer/FormRenderer";
import { setCollectionForm } from "../../state/creator";
import { useCollectionForm } from "../../state/selectors";

export default function Preview(props: {form?: DataForm, id: string}) {
    
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
        <FormRenderer/>
    </div>
}

export const getServerSideProps: GetServerSideProps =  async(context) => {
    let id = context.params.id as string;
    return supaClient
        .from<DataForm>("forms")
        .select("id,form_content,createdAt,updatedAt")
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
                    form: value.body
                }
            }
        })
}