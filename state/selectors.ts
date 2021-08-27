import { useDispatch, useSelector } from "react-redux"
import { AppState } from "."
import { setActivePage } from "./creator"

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

export const useCollectionActivePage = () => {
    return useSelector((state: AppState) => {
        if(state.collection.form && state.collection.activePageId) {
            return state.collection.form.form_content.pages.find((p) => p.key === state.collection.activePageId);
        }
    })
}

export const useCollectionResponse = () => {
    return useSelector((state: AppState) => state.collection.response);
}

export const usePageResponse = (id: string) => {
    return useSelector((state: AppState) => state.collection.response?.pages.find((p) => p.pageId === id));
}

export const usePageNavigation = () => {
    const dispatch = useDispatch();
    const activeForm = useCollectionForm();
    const indexes = useSelector((state: AppState) => {
        if(state.collection.form && state.collection.activePageId) {
            let activeIndex = state.collection.form.form_content.pages.findIndex((p) => p.key === state.collection.activePageId);
            let last = activeIndex > 0 ? activeIndex - 1 : -1;
            let next = activeIndex < state.collection.form.form_content.pages.length - 1 ? activeIndex + 1 : -1;
            return {
                active: activeIndex,
                last,
                next
            }
        }
    })

    return {
        hasBefore: indexes.last !== -1,
        hasNext: indexes.next !== -1,
        activeIndex: indexes.active,
        activePage: useCollectionActivePage(),
        back(){
            if(indexes.last !==  -1) {
                dispatch(setActivePage(activeForm.form_content.pages[indexes.last].key));
            }
        },
        next(){
            if(indexes.next !== -1) {
                dispatch(setActivePage(activeForm.form_content.pages[indexes.next].key));
            }
        }
    }
}

export const useGlobalState = () => {
    return useSelector((state: AppState) => state.global);
}