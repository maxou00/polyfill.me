import { ContentField } from "../engine/fields";
import { Fillable, Page } from "../engine/page";
import { Action } from "./actions";

export function updateFillable(fillable: Fillable): Action {
    return {
        type: "UPDATE_FILLABLE",
        fillable
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