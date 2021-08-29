import {createClient} from "@supabase/supabase-js";
import { FormResponse } from "../engine/page";

export const KEY_PF_RESPONSE_ID = "polyfill_latest_response_id";
export const KEY_PF_RESPONSE_TIME = "polyfill_latest_response_time";

const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supaAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supaClient = createClient(supaUrl, supaAnonKey);

export function extractFileAnswers(response: FormResponse) {
    let files: Array<{pageIndex: number, answerIndex: number}> = [];

    for (let i = 0; i < response.pages.length; i++) {
        let page = response.pages[i];
        for (let j = 0; j < page.responses.length; j++) {
            let answer =  undefined;
            if(page.responses[j]) {
                answer = page.responses[j].answer;
            } 
            let mayBeFile = false;
            if(answer === undefined) {
                continue;
            }
            if(typeof answer === "object" && answer.length) { /// file array
                let first = answer[0];
                mayBeFile = first && first instanceof File
            }
            if (mayBeFile) {
                files.push({pageIndex: i, answerIndex: j});
            }
        }
    }
    return files;
}

export function isEligibleForNewResponse() {

    if(!globalThis.localStorage) {
        return true;
    }

    let resId = localStorage.getItem(KEY_PF_RESPONSE_ID);
    let resTime = localStorage.getItem(KEY_PF_RESPONSE_TIME);

    if( resId && resTime) {
        let timeDiff = Date.now() - parseInt(resTime);
        return timeDiff >= (1000 * 60 * 10);
    }

    return true;
}