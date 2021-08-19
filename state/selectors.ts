import { useSelector } from "react-redux"
import { AppState } from "."
import { DataForm, Fillable, FormResponse } from "../engine/page"

export const useFillable = () => {
    const fillable = useSelector((state: AppState) => state.fillable)
    return fillable;
}

export const useEditionState = () => {
    const edition = useSelector((state: AppState) => state.edition);
    return edition;
}

export const useCollectionForm = () => {
    return useSelector((state: AppState) => state.collection.form);
}

export const useCollectionResponse = () => {
    return useSelector((state: AppState) => state.collection.response);
}

export const usePageResponse = (id: string) => {
    return useSelector((state: AppState) => state.collection.response?.pages.find((p) => p.pageId === id));
}