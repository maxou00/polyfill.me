import { useEffect } from "react";
import { PropsWithChildren } from "react";

export function CssVarInjector(props: PropsWithChildren<{}>) {

    return <>
        {props.children}
    </>
}