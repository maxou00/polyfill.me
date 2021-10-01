import { FillableDecoration } from "../engine/decoration";
import { ContentField } from "../engine/fields";
import { DataForm, Fillable, Page } from "../engine/page";
import { DataFormFilter } from "../processing-analysis/filtering";
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

export function moveFieldBefore(page: string, fieldId: string, before: string): Action {
    return {
        type: 'MOVE_FIELD_BEFORE',
        payload: {
            page,
            field: fieldId,
            before
        }
    }
}

export function moveFieldAfter(page: string, fieldId: string, after: string): Action {
    return {
        type: 'MOVE_FIELD_AFTER',
        payload: {
            page,
            field: fieldId,
            after
        }
    }
}

export function appendFieldBefore(page: string, field: ContentField, before: string): Action {
    return {
        type: 'APPEND_FIELD_BEFORE',
        payload: {
            page,
            field,
            before
        }
    }
}

export function appendFieldAfter(page: string, field: ContentField, before: string): Action {
    return {
        type: 'APPEND_FIELD_AFTER',
        payload: {
            page,
            field,
            before
        }
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

export function appendAnswerError(pageId: string, questionId: string, error: any): Action {
    return {
        type: 'APPEND_ANSWER_ERROR',
        pageId,
        questionId,
        error
    }
}

export function resetResponse(): Action {
    return {
        type: 'RESET_RESPONSE'
    }
}

export function setForms(forms:DataForm[]): Action {
    return {
        type: 'SET_FORMS',
        forms
    }
}

export function setFilters(filters:DataFormFilter[]): Action {
    return {
        type: "SET_FILTERS",
        filters
    }
}

export function appendFilter(filter: DataFormFilter): Action {
    return {
        type: 'APPEND_FILTER',
        filter
    }
}

export function appendForm(form: DataForm): Action {
    return {
        type: 'APPEND_FORM',
        form
    }
}