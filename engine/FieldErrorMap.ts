import { TextField, FieldType, ContentField } from "./fields";

export type ValidationFunction = (question: ContentField, response: any) => string | undefined;

const textErrors: ValidationFunction = (q: TextField, r: any) => {
    return undefined;
}

export const FieldErrorMap: {[key: string]: ValidationFunction} = {
    text:  textErrors,
}