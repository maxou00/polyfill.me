import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from ".";
import { Fillable } from "../engine/page";
import { setActiveField, setActiveFillable, setActivePage } from "./creator";

export function setActiveForm(form: Fillable){
    return (dispatch: ThunkDispatch<AppState, {}, AnyAction>, getState: () => AppState) => {
        dispatch(setActiveFillable(form));
        dispatch(setActivePage(form.pages[0].key));
    }
}