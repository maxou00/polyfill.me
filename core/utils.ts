import { createClient } from "@supabase/supabase-js";
import { FormResponse } from "../engine/page";

export const KEY_PF_RESPONSE_ID = "pf_response_id";
export const KEY_PF_RESPONSE_TIME = "pf_response_time";
export const KEY_PF_RESPONSE_UNLOCK = 'pf_unlock_at';

const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supaAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supaClient = createClient(supaUrl, supaAnonKey);

export function extractFileAnswers(response: FormResponse) {
    let files: Array<{ pageIndex: number, answerIndex: number }> = [];

    for (let i = 0; i < response.pages.length; i++) {
        let page = response.pages[i];
        for (let j = 0; j < page.responses.length; j++) {
            let answer = undefined;
            if (page.responses[j]) {
                answer = page.responses[j].answer;
            }
            let mayBeFile = false;
            if (answer === undefined) {
                continue;
            }
            if (typeof answer === "object" && answer.length) { /// file array
                let first = answer[0];
                mayBeFile = first && first instanceof File
            }
            if (mayBeFile) {
                files.push({ pageIndex: i, answerIndex: j });
            }
        }
    }
    return files;
}

/**
 * 
 * @param formId 
 * @returns boolean
 * Every Response submitted has a time lock injected on the browser to ensure that there is not too many response at the same time, from the same person.
 */
export function isEligibleForNewResponse(formId: string) {

    if (!globalThis.localStorage) {
        return true;
    }

    let latestResponse = JSON.stringify(localStorage.getItem(formId) || '{}');
    if (latestResponse[KEY_PF_RESPONSE_ID] && latestResponse[KEY_PF_RESPONSE_TIME]) {
        let unlock = latestResponse[KEY_PF_RESPONSE_UNLOCK];
        if(unlock < Date.now()){
            localStorage.removeItem(formId);
        } 
        else {
            return false;
        }
    }
    return true;
}