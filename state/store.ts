import { useMemo } from "react";
import { applyMiddleware, createStore, Store } from "redux";
import { AppState } from ".";
import { Fillable, initialFillable } from "../engine/page"
import { Action } from "./actions";
import reducer from "./reducers";

let store: Store<AppState>;

const initialState: AppState = {
    fillable: initialFillable(),
    edition: {
        activeField: "",
        activePage: ""
    }
}

function initStore(preloaded = initialState) {
    return createStore(
        reducer,
        preloaded,
        applyMiddleware()
    );
}

export const initializeStore = (preloaded: AppState | undefined) => {
    let _store = store ?? initStore(preloaded);
    if(preloaded && store) {
        _store = initStore({
            ...store.getState(),
            ...preloaded
        })

        store = undefined;
    }

    if(typeof window === "undefined") {
        return _store;
    }

    if(!store) {
        store = _store;
    }

    return _store
}

export function useStore(initialState: AppState) {
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store;
}

