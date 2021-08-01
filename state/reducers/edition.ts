import { FillableEdition } from "..";
import { Action } from "../actions";

const initialState: FillableEdition = {
    activePage: "",
    activeField: ""
}

function editionReducer(state: FillableEdition = initialState, action: Action): FillableEdition {
    switch(action.type) {
        case "SET_ACTIVE_PAGE": {
            return {
                ...state,
                activePage: action.pageId,
                activeField: ""
            }
        }
        case "SET_ACTIVE_FIELD": {
            return {
                ...state,
                activeField: action.fieldId,
            }
        }
    }
    return state;
}

export default editionReducer;