import { ContentField } from "../../engine/fields";

export interface FieldRendererProps<T = ContentField> {
    question: T;
    response: {questionId: string, answer: any};
    onChange(answer: any): any;
}