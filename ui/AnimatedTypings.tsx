import { useState } from "react";
import { useCallback } from "react";
import { useLayoutEffect, useRef } from "react";
import { useEffect } from "react"

export function AnimatedTypings(props: {text: string[]}){
    const inputZone = useRef<HTMLSpanElement>();
    const [pointer, setPointer] = useState(0);
    const [cursor, setCursor] = useState(0);

    const typeWrite = useCallback((text: string) => {
        if( text && cursor < text.length && inputZone.current) {
            inputZone.current.innerHTML += text.charAt(cursor);
            setCursor(cursor+1);
            setTimeout(typeWrite, 50);
        }
    }, [cursor]);

    useEffect(() => {
        window.addEventListener("load", () => {
            typeWrite(props.text[pointer]);
        })
    }, [props.text,pointer, typeWrite]);
    
    return <span>
        <span ref={inputZone} className="input"></span>
        <span className="indicator"></span>
    </span>
}