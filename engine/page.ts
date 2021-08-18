import { nanoid } from "nanoid";
import { ContentField } from "./fields";

export interface Page {
    key: string;
    title: string;
    description: string;
    fields: ContentField[];
}

export interface Fillable {
    id: string;
    title: string;
    subtitle: string;
    locale: string;
    pages: Page[];
    createdAt: number;
}

export interface DataForm {
    id: string;
    form_content: Fillable;
    createdAt?: number;
    updatedAt?: number;
}

export function initialFillable(): Fillable {
    return {
        id: nanoid(),
        title: "",
        subtitle: "",
        locale: 'fr',
        createdAt: Date.now(),
        pages: [
            initialPage()
        ]
    }
}

export function initialPage(): Page {
    return {
        key: nanoid(),
        title: "Nouvelle Page",
        description: "",
        fields: []
    }
}