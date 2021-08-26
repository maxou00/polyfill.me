import { nanoid } from "nanoid";
import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AppState } from ".";
import { defaultFillableDecoration } from "../engine/decoration";
import { Fillable, FormResponse, ResponsePage } from "../engine/page";
import { setActiveFillable, setActivePage } from "./creator";

export function setActiveForm(form: Fillable){
    return (dispatch: ThunkDispatch<AppState, {}, AnyAction>, getState: () => AppState) => {
        if(!form.decoration) {
            form.decoration = defaultFillableDecoration;
        }
        dispatch(setActiveFillable(form));
        dispatch(setActivePage(form.pages[0].key));
    }
}