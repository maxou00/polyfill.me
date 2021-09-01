import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/dist/client/router";
import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { supaClient } from "../core/utils";
import { DataForm } from "../engine/page";
import { appendForm, setForms } from "../state/creator";
import { setActiveForm } from "../state/middlewares";

const InitializerContext = createContext<Session>(undefined);

export const useInit = () => {
    return useContext(InitializerContext);
}

export function Initializer(props: PropsWithChildren<{redirectToSignin?: boolean}>) {
    const [session, setSession] = useState<Session>();
    const [shouldExit, setShouldExit] = useState(false);
    const [busy, setBusy] = useState(true);

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        /*let query = router.query;
        if (query.access_token) {
            supaClient.auth.setAuth(query.access_token as string);
        }*/

        let activeSession = supaClient.auth.session();
        if (!activeSession) {
            if(props.redirectToSignin) {
                router.replace("/auth/signin");
                return;
            }
        }

        setSession(activeSession);
        setBusy(false);
    }, [props.redirectToSignin, router]);

    useEffect(() => {
        if(!session){
            return;
        }

        supaClient
            .from<DataForm>("forms")
            .select("id,form_content")
            .eq("user_id", session.user.id)
            .order("updatedAt", { ascending: false })
            .then((values) => {
                if (values.error) {
                    return toast.error("Erreur de recupération de vos formulaires");
                }
                dispatch(setForms(values.body));
                if (values.body.length > 0) {
                    dispatch(setActiveForm(values.body[0].form_content));
                }
            })
    }, [session, dispatch]);

    useEffect(() => {
        if(!session) {
            return;
        }

        supaClient.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (_event === "SIGNED_OUT") {
                setSession(undefined);
                router.replace("/auth/signin");
            }
        })

        let { user } = session;

        supaClient
            .from<DataForm>("forms")
            .select("id,form_content")
            .eq("user_id", user.id)
            .order("updatedAt", { ascending: false })
            .then((values) => {
                if (values.error) {
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
    }, [dispatch, session, router]);

    return <InitializerContext.Provider value={session}>
        {!busy && props.children}
    </InitializerContext.Provider>
}