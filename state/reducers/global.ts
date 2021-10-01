import { GlobalState } from "..";
import { Action } from "../actions";

const initialGlobalState: GlobalState = {
    forms: [],
    filters: []
}

export function globalReducer(state: GlobalState = initialGlobalState, action: Action): GlobalState {
    if (action.type === 'SET_FORMS') {
        return {
            ...state,
            forms: action.forms
        }
    }

    else if (action.type === 'APPEND_FORM') {
        let cpy = [...state.forms];
        let index = cpy.findIndex((f) => f.id === action.form.id);

        if (index >= 0) {
            cpy[index] = action.form;
        }
        else {
            cpy.push(action.form);
        }
        return { ...state, forms: cpy }
    }

    else if (action.type === 'SET_FILTERS') {
        return {
            ...state,
            filters: action.filters
        }
    }

    else if (action.type === 'APPEND_FILTER') {
        let cpy = [...state.filters];
        let index = cpy.findIndex((f) => f.id === action.filter.id);

        if (index >= 0) {
            cpy[index] = action.filter;
        }
        else {
            cpy.push(action.filter);
        }
        return { ...state, filters: cpy }
    }
    return state;
}