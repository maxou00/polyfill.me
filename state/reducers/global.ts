import { GlobalState } from "..";
import { Action } from "../actions";

const initialGlobalState: GlobalState = {
    forms: []
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
    return state;
}