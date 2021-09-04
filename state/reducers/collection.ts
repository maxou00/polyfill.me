import { nanoid } from "nanoid";
import { CollectionState } from "..";
import { Action, CollectionAction } from "../actions";

const initialState: CollectionState = { errors: { } };

export function collectionReducer(state: CollectionState = initialState, action: CollectionAction): CollectionState {

    switch(action.type) {
        case 'SET_COLLECTION_FORM': {
            let next = {...state};
            next.form = action.form;
            next.activePageId = action.form.form_content.pages[0].key;
            next.response = {
                id: nanoid(),
                formId: action.form.id,
                meta: {},
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
                pages: action.form.form_content.pages.map((p) => {
                    return {
                        pageId: p.key,
                        responses: p.fields.map((f) => {
                            return {
                                questionId: f.key,
                                answer: undefined
                            }
                        })
                    }
                })
            }
            return next;
        }
        /////ONGOING
        case 'RESET_RESPONSE': {
            let next = {...state};
            next.activePageId = next.form.form_content.pages[0].key;

            next.response = {
                id: nanoid(),
                formId: next.form.id,
                meta: {},
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
                pages: next.form.form_content.pages.map((p) => {
                    /// Reset errors
                    next.errors[p.key] = [];

                    return {
                        pageId: p.key,
                        responses: p.fields.map((f) => {
                            return {
                                questionId: f.key,
                                answer: undefined
                            }
                        })
                    }
                })
            }
            return next;
        }
        case 'SET_ACTIVE_PAGE': {
            let next = {...state};
            if(next.form) {
                next.activePageId = action.pageId;
            }
            return next;
        }
        case 'APPEND_ANSWER': {
            let next = {...state};
            if(next.form && next.response) {
                let pageIndex = next.response.pages.findIndex((p) => p.pageId === action.pageId);
                if(pageIndex > -1) {
                    let questionIndex = next.response.pages[pageIndex].responses.findIndex((a) => a.questionId === action.questionId);
                    if(questionIndex > -1) {
                        next.response.pages[pageIndex].responses[questionIndex].answer = action.answer;
                    }
                    else {
                        next.response.pages[pageIndex].responses.push({answer: action.answer, questionId: action.questionId});
                    }
                }
            }
            return next;
        }
        case 'APPEND_ANSWER_ERROR': {
            let next = {...state};

            let { error, pageId, questionId } = action
            let pageErrors = next.errors[pageId] || [];
            let existentIndex = pageErrors.findIndex((err) => err.questionId === questionId);

            if(!error) {
                pageErrors = pageErrors.filter((err) => err.questionId !== questionId);
            }
            else {
                if(existentIndex > -1) {
                    pageErrors[existentIndex].errors = error;
                }
                else {
                    pageErrors.push({
                        questionId,
                        errors: error
                    })
                }
            }

            next.errors[pageId] = pageErrors;
            return next;
        }
    }
    return state;
}