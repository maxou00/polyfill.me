import { useRef } from "react";
import { useEffect } from "react";
import { PropsWithChildren } from "react";

export function ClickAwayListener(props: PropsWithChildren<{onOutsideClick(): any}>) {
    const wrapperRef = useRef<HTMLDivElement>();

    useEffect(() => {
        const listener = (ev: globalThis.MouseEvent) => {
            if(wrapperRef.current) {
                if(!wrapperRef.current.contains(ev.currentTarget as HTMLElement)) {
                    props.onOutsideClick();
                }
            }
        }

        window.addEventListener("click", listener);
        return () => {
            window.removeEventListener("click", listener);
        }
    }, [props]);
    
    return <div ref={(el) => wrapperRef.current = el}>
        {props.children}
    </div>
}