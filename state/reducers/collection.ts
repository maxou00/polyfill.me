import { CollectionState } from "..";
import { Action, CollectionAction } from "../actions";

const initialState: CollectionState = {};

export function collectionReducer(state: CollectionState = initialState, action: CollectionAction): CollectionState {

    switch(action.type) {
        case 'SET_COLLECTION_FORM': {
            let next = {...state};
            next.form = action.form;
            next.response = {
                formId: action.form.id,
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
    }
    return state;
}