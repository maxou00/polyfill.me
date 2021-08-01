import { Fillable } from "../engine/page";

export interface FillableEdition {
    activePage: string;
    activeField: string;
}

export type AppState = { fillable: Fillable, edition: FillableEdition };

