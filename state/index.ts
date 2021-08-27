import { DataForm, Fillable, FormResponse } from "../engine/page";

export interface FillableEdition {
    activePage: string;
    activeField: string;
}

export interface CollectionState {
    form?: DataForm;
    response?: FormResponse;
    activePageId?: string;
}

export interface GlobalState {
    forms: DataForm[];
}

export type AppState = { 
    fillable: Fillable, 
    edition: FillableEdition, 
    collection?: CollectionState,
    global: GlobalState
};

