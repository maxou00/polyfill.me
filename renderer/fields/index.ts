import { ContentField } from "../../engine/fields";

export interface FieldRendererProps {
    question: ContentField;
    response: {questionId: string, answer: any};
    onChange(answer: any): any;
}