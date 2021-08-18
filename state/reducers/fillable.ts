import { Fillable, initialFillable } from "../../engine/page";
import { Action } from "../actions";

const initialState: Fillable = initialFillable()

function fillableReducer(state: Fillable = initialState, action: Action): Fillable {

    switch(action.type) {
        case "SET_ACTIVE_FILLABLE": {
            return action.fillable;
        }
        case "UPDATE_FILLABLE": {
            return action.fillable;
        }
        case "APPEND_PAGE": {
            let next = {...state}
            let index = next.pages.findIndex((p) => p.key === action.page.key);
            if(index >= 0) {
                next.pages[index] = action.page
            }
            else {
                next.pages.push(action.page);
            }
            return next;
        }
        case "DELETE_PAGE": {
            return {
                ...state,
                pages: state.pages.filter((p) => p.key !== action.pageId)
            }
        }
        case "APPEND_FIELD": {
            let next = {...state};
            let pageIndex = next.pages.findIndex((p) => p.key === action.pageId);
            if(pageIndex >= 0) {
                let fieldIndex = next.pages[pageIndex].fields.findIndex((f) => f.key === action.field.key);
                if(fieldIndex >= 0) {
                    next.pages[pageIndex].fields[fieldIndex] = action.field;
                }
                else {
                    next.pages[pageIndex].fields.push(action.field);
                }
            }
            return next;
        }
        case "DELETE_FIELD": {
            let next = {...state};
            let pageIndex = next.pages.findIndex((p) => p.key === action.pageId);
            if(pageIndex >= 0) {
                next.pages[pageIndex].fields = next.pages[pageIndex].fields.filter((f) => f.key !== action.fieldId);
            }
            return next;
        }
        default :
            return state;
    }
    return state;
}

export default fillableReducer;