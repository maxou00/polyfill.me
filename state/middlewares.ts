import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AppState } from ".";
import { BucketFile } from "../core";
import { extractFileAnswers, KEY_PF_RESPONSE_ID, KEY_PF_RESPONSE_TIME, KEY_PF_RESPONSE_UNLOCK, supaClient } from "../core/utils";
import { defaultFillableDecoration } from "../engine/decoration";
import { FieldErrorMap, ValidationFunction } from "../engine/errors";
import { Fillable, FormResponse } from "../engine/page";
import { appendAnswerError, setActiveFillable, setActivePage } from "./creator";

export function setActiveForm(form: Fillable) {
    return (dispatch: ThunkDispatch<AppState, {}, AnyAction>, getState: () => AppState) => {
        if (!form.decoration) {
            form.decoration = defaultFillableDecoration;
        }
        dispatch(setActiveFillable(form));
        dispatch(setActivePage(form.pages[0].key));
    }
}

export function sendResponse() {
    return async (dispatch: ThunkDispatch<AppState, {}, AnyAction>, getState: () => AppState) => {
        let { form, response } = getState().collection;
        if (response) {
            let fileAnswers = extractFileAnswers(response);
            if (fileAnswers.length > 0) {
                toast.info("Uploading files");
                await Promise.all(
                    fileAnswers.map((index) => {
                        let files: Array<File> = response.pages[index.pageIndex].responses[index.answerIndex].answer;
                        let urls: Array<BucketFile> = [];

                        return Promise.all(
                            files.map(async (file) => {
                                let newName = "responses/" + nanoid();
                                return supaClient
                                    .storage
                                    .from("general")
                                    .upload(newName, file)
                                    .then((done) => {
                                        urls.push({
                                            type: "file",
                                            bucket: "general",
                                            name: newName,
                                            format: file.type,
                                            size: file.size
                                        })
                                    })
                            })
                        )
                            .then(() => {
                                response.pages[index.pageIndex].responses[index.answerIndex].answer = urls;
                            })
                    })
                )
                    .then((done) => {
                        toast.success("Files uploaded. Submitting Response...");
                    })
            }
            
            return supaClient
                .from<FormResponse>("form_response")
                .insert(response)
                .single()
                .then((result) => {
                    if (result.data) {
                        let lock = {
                            [KEY_PF_RESPONSE_ID]: result.data.id,
                            [KEY_PF_RESPONSE_TIME]: Date.now(),
                            [KEY_PF_RESPONSE_UNLOCK]: Date.now() + (1000 * 60 * 10) /// 10 minutes before sending a new response
                        }

                        localStorage.setItem(form.id, JSON.stringify(lock));
                        return result.data;
                    }
                })
        }
    }
}

export function validatePageResponse(pageId: string): ThunkAction<boolean, AppState, {}, AnyAction> {
    return (dispatch, getState) => {

        let { response } = getState().collection;
        let { pages } = getState().collection.form.form_content;

        let { fields } = pages.find((p) => p.key === pageId);
        let pageResponse = response.pages.find((p) => p.pageId === pageId);

        let passed = true;

        fields.forEach((field) => {

            let response = pageResponse.responses.find((r) => r.questionId === field.key);
            let validator: ValidationFunction = FieldErrorMap[field.type];
            if (validator) {
                /**
                 * If there is a validation function registered for this field type,
                 * extract it and pass que question plus the response to obtain an error map.
                 * dispatch the result as an error generated for this field.
                 */
                let errors = validator(field, response.answer);
                if (errors) {
                    passed = false;
                }
                dispatch(appendAnswerError(pageId, field.key, errors))
            }
            ///no error will ever be generated. nothing to dispatch
        })

        return passed;
    }
}

/**
 * 
 * @returns string
 * Validate the form response, page by  page, and return key of the first invalid page found.
 * if nothing is invalid, it returns undefined.
 */

export function validateFormResponse(): ThunkAction<string|undefined, AppState, {}, AnyAction> {
    return (dispatch, getState) => {
        let { response } = getState().collection;
        let { pages } = getState().collection.form.form_content;

        for (const key in pages) {
            let valid = dispatch(validatePageResponse(pages[key].key));
            if(!valid) {
                return pages[key].key;
            }    
        }
        return "";
    }
}