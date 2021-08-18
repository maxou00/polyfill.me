import { ContentField } from "../engine/fields";
import { Fillable, Page } from "../engine/page";

interface SetActiveFillable {
    type: 'SET_ACTIVE_FILLABLE',
    fillable: Fillable;
}

interface UpdateFillable {
    type: 'UPDATE_FILLABLE',
    fillable: Fillable;
}

interface AppendPage {
    type: 'APPEND_PAGE',
    page: Page
}

interface DeletePage {
    type: 'DELETE_PAGE';
    pageId: string;
}

interface AppendField {
    type: 'APPEND_FIELD';
    pageId: string;
    field: ContentField;
}

interface DeleteField {
    type: 'DELETE_FIELD';
    fieldId: string;
    pageId: string;
}

interface SetActivePage {
    type: "SET_ACTIVE_PAGE",
    pageId: string;
}

export interface SetActiveField {
    type: "SET_ACTIVE_FIELD",
    fieldId: string;
}

type EditionAction = SetActiveFillable | SetActivePage | SetActiveField;

export type Action = UpdateFillable
                    | AppendPage
                    | DeletePage
                    | AppendField
                    | DeleteField
                    | EditionAction
