import { nanoid } from "nanoid";
import { ContentField } from "./fields";

export interface Page {
    key: string;
    title: string;
    description: string;
    fields: ContentField[];
}

export interface Fillable {
    locale: string;
    pages: Page[];
    createdAt: number;
}

export function initialFillable(): Fillable {
    return {
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