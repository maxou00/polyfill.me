import { DataForm, Fillable, FormResponse } from "../engine/page";

export interface FillableEdition {
    activePage: string;
    activeField: string;
}

export interface CollectionState {
    form?: DataForm;
    response?: FormResponse;
}

export type AppState = { fillable: Fillable, edition: FillableEdition, collection: CollectionState };

