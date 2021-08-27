import { Session } from "@supabase/supabase-js";
import { useState } from "react";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { supaClient } from "../core/utils";
import { DataForm } from "../engine/page";
import { appendForm, setForms } from "../state/creator";
import { setActiveForm } from "../state/middlewares";

export function Initializer(props: PropsWithChildren<{}>) {
    const [session, setSession] = useState<Session>();
    const dispatch = useDispatch();

    useEffect(() => {
        let user = supaClient.auth.user();
        if (!user) {
            return;
        }
        supaClient
            .from<DataForm>("forms")
            .select("id,form_content")
            .eq("user_id", user.id)
            .order("updatedAt", { ascending: false })
            .then((values) => {
                if (values.error) {
                    toast.error(values.error.message);
                    return toast.error("Erreur de recupération de vos formulaires");
                }
                dispatch(setForms(values.body));
                if (values.body.length > 0) {
                    dispatch(setActiveForm(values.body[0].form_content));
                }
            })
    }, []);

    useEffect(() => {
        setSession(supaClient.auth.session());
        supaClient.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (_event === "SIGNED_OUT") {
                alert("signed out");
            }
        })
        let user = supaClient.auth.user();
        if (!user) {
            return;
        }
        supaClient
            .from<DataForm>("forms")
            .select("id,form_content")
            .eq("user_id", user.id)
            .order("updatedAt", { ascending: false })
            .then((values) => {
                if (values.error) {
                    toast.error(values.error.message);
                    return toast.error("Erreur de recupération de vos formulaires");
                }
                dispatch(setForms(values.body));
                if (values.body.length > 0) {
                    dispatch(setActiveForm(values.body[0].form_content));
                }
            })

        let subscription = supaClient.from<DataForm>("forms").on("INSERT", (ev) => {
            dispatch(setActiveForm(ev.new.form_content));
            dispatch(appendForm(ev.new));
        })
            .on("UPDATE", (ev) => {
                dispatch(appendForm(ev.new));
            }).subscribe();

        return () => {
            supaClient.removeSubscription(subscription);
        }
    }, [dispatch]);

    return <>
        {props.children}
    </>
}