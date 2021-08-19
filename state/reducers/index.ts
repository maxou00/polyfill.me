import { combineReducers } from "redux";
import { AppState } from "..";
import { collectionReducer } from "./collection";
import editionReducer from "./edition";
import fillable from "./fillable";

export default combineReducers<AppState>({
    fillable: fillable,
    edition: editionReducer,
    collection: collectionReducer
})