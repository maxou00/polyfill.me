import { FillableDecoration } from "../engine/decoration";
import { ContentField } from "../engine/fields";
import { DataForm, Fillable, Page } from "../engine/page";

interface SetActiveFillable {
    type: 'SET_ACTIVE_FILLABLE',
    fillable: Fillable;
}

interface UpdateFillable {
    type: 'UPDATE_FILLABLE',
    fillable: Fillable;
}

interface UpdateFillableDecoration {
    type: 'UPDATE_DECORATION',
    decoration: FillableDecoration;
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

interface MoveFieldBefore {
    type: "MOVE_FIELD_BEFORE",
    payload: {
        page: string;
        field: string;
        before: string;
    };
}

interface MoveFieldAfter {
    type: "MOVE_FIELD_AFTER",
    payload: {
        page: string;
        field: string;
        after: string;
    }
}

export interface SetActiveField {
    type: "SET_ACTIVE_FIELD",
    fieldId: string;
}

export interface SetForms {
    type: 'SET_FORMS',
    forms: DataForm[];
}

export interface AppendForm {
    type: 'APPEND_FORM',
    form: DataForm;
}

type GlobalAction = SetForms | AppendForm;

type EditionAction = SetActiveFillable | SetActivePage | SetActiveField | MoveFieldBefore | MoveFieldAfter;

type BuildingAction = UpdateFillable
                    | UpdateFillableDecoration
                    | SetActivePage
                    | AppendPage
                    | DeletePage
                    | AppendField
                    | DeleteField
                    | EditionAction

interface SetCollectionForm {
    type: 'SET_COLLECTION_FORM',
    form: DataForm;
}

interface AppendAnswer {
    type: 'APPEND_ANSWER';
    pageId: string;
    questionId: string;
    answer: any;
}

interface AppendAnswerError { 
    type: 'APPEND_ANSWER_ERROR';
    pageId: string;
    questionId: string;
    error: any;
}

export type CollectionAction = SetCollectionForm | AppendAnswer | SetActivePage | AppendAnswerError;

export type Action = GlobalAction | BuildingAction | CollectionAction;
