import { DataForm, Fillable, FormResponse } from "../engine/page";
import { DataFormFilter } from "../processing-analysis/filtering";

export interface FillableEdition {
    activePage: string;
    activeField: string;
}

export interface CollectionState {
    form?: DataForm;
    response?: FormResponse;
    /**
     * map to each page id its responses errors.
     */
    errors: {
        [key: string]: {questionId: string, errors: any}[]
    }
    activePageId?: string;
}

export interface GlobalState {
    forms: DataForm[];
    filters: DataFormFilter[];
}

export type AppState = { 
    fillable: Fillable, 
    edition: FillableEdition, 
    collection?: CollectionState,
    global: GlobalState
};

