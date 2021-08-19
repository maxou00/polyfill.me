import { ContentField } from "../../engine/fields";

export interface FieldRendererProps {
    question: ContentField;
    answer: any;
    onChange(answer: any): any;
}