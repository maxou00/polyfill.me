import { combineReducers } from "redux";
import { AppState } from "..";
import editionReducer from "./edition";
import fillable from "./fillable";

export default combineReducers<AppState>({
    fillable: fillable,
    edition: editionReducer
})