import { useSelector } from "react-redux"
import { AppState } from "."
import { Fillable } from "../engine/page"

export const useFillable = () => {
    const fillable = useSelector((state: AppState) => state.fillable)
    return fillable;
}

export const useEditionState = () => {
    const edition = useSelector((state: AppState) => state.edition);
    return edition;
}