import { ContentField } from "../../engine/fields";

export interface FieldRendererProps<T = ContentField> {
    question: T;
    response: {questionId: string, answer: any};
    errors: any;
    onChange(answer: any): any;
}