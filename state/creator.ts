import { FillableDecoration } from "../engine/decoration";
import { ContentField } from "../engine/fields";
import { DataForm, Fillable, Page } from "../engine/page";
import { Action } from "./actions";

export function setActiveFillable(fillable: Fillable): Action {
    return {
        type: "SET_ACTIVE_FILLABLE",
        fillable
    }
}

export function updateFillable(fillable: Fillable): Action {
    return {
        type: "UPDATE_FILLABLE",
        fillable
    }
}

export function updateDecoration(decoration: FillableDecoration): Action {
    return {
        type: "UPDATE_DECORATION",
        decoration
    }
}

export function appendPage(page: Page): Action {
    return {
        type: "APPEND_PAGE",
        page
    }
}

export function deletePage(id: string): Action {
    return {
        type: "DELETE_PAGE",
        pageId: id
    }
}

export function appendField(pageId: string, field: ContentField): Action {
    return {
        type: "APPEND_FIELD",
        field ,
        pageId
    }
}

export function deleteField(pageId: string, fieldId: string): Action {
    return {
        type: "DELETE_FIELD",
        fieldId ,
        pageId
    }
}

export function setActivePage(pageId: string): Action {
    return {
        type: "SET_ACTIVE_PAGE",
        pageId
    }
}

export function setActiveField(fieldId: string): Action {
    return {
        type: "SET_ACTIVE_FIELD",
        fieldId
    }
}

export function setCollectionForm(form: DataForm): Action {
    return {
        type: 'SET_COLLECTION_FORM',
        form
    }
}

export function appendAnswer(pageId: string, questionId: string, answer: any): Action {
    return {
        type: 'APPEND_ANSWER',
        pageId, questionId, answer
    }
}

export function setForms(forms:DataForm[]): Action {
    return {
        type: 'SET_FORMS',
        forms
    }
}

export function appendForm(form: DataForm): Action {
    return {
        type: 'APPEND_FORM',
        form
    }
}