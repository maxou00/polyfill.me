import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/dist/client/router";
import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";
import { supaClient } from "../core/utils";
import { DataForm } from "../engine/page";
import { appendForm } from "../state/creator";
import { fetchForms, setActiveForm } from "../state/middlewares";

const InitializerContext = createContext<Session>(undefined);

export const useInit = () => {
    return useContext(InitializerContext);
}

export function Initializer(props: PropsWithChildren<{ redirectToSignin?: boolean }>) {
    const [session, setSession] = useState<Session>();
    const [shouldExit, setShouldExit] = useState(false);
    const [busy, setBusy] = useState(true);

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        let activeSession = supaClient.auth.session();
        if (!activeSession) {
            if (props.redirectToSignin) {
                router.replace("/auth/signin");
                return;
            }
        }
        setSession(activeSession);
        setBusy(false);
        if (activeSession) {
            dispatch(fetchForms());
            supaClient.auth.onAuthStateChange((_event, s) => {
                setSession(s);
                if (_event === "SIGNED_OUT") {
                    setSession(undefined);
                    router.replace("/auth/signin");
                }
            })

            const subscription = supaClient
                .from<DataForm>("forms")
                .on("INSERT", (ev) => {
                    alert("New insert");
                    dispatch(setActiveForm(ev.new.form_content));
                    dispatch(appendForm(ev.new));
                })
                .on("UPDATE", (ev) => {
                    alert("new update");
                    dispatch(appendForm(ev.new));
                })
                .on("DELETE", (ev) => {
                    alert("new delete");
                    dispatch(appendForm(ev.new));
                })
                .subscribe();

            return () => {
                supaClient.removeSubscription(subscription);
            }
        }
    }, []);

    return <InitializerContext.Provider value={session}>
        {!busy && props.children}
    </InitializerContext.Provider>
}