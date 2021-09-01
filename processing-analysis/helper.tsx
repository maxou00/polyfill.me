import { useMemo, useState } from "react";
import { useCallback, useEffect } from "react"
import { supaClient } from "../core/utils";
import { FormResponse } from "../engine/page";
import { useGlobalState } from "../state/selectors";

export const useSchema = (schemaId: string) => {
    return useGlobalState().forms.find((schema) => schema.id === schemaId);
}

export const useDataset = (formId: string, pageSize: number = 25) => {
    const [busy, setBusy] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [items, setItems] = useState<FormResponse[]>([]);

    const pageCount = useMemo(() => {
        return Math.ceil(totalCount / pageSize);
    }, [totalCount, pageSize]);

    const fetchCurrentPage = useCallback(() => {
        let startIndex = currentPage * pageSize;
        let end = startIndex + pageSize - 1;

        setBusy(true);
        supaClient.from<FormResponse>("form_response")
            .select("*")
            .limit(pageSize)
            .order("createdAt", {ascending:false})
            .range(startIndex, end)
            .then((result) => {
                setBusy(false);
                if(result.data) {
                    setItems(result.data);
                }
            })
    }, [currentPage, pageSize]);

    // retrieve total item count for this form
    useEffect(() => {
        supaClient.from<FormResponse>("form_response")
            .select("id", { head: true, count: "exact" })
            .eq("formId", formId)
            .then((result) => {
                setTotalCount(result.count);
            })
    }, [formId]);

    useEffect(() => {
        fetchCurrentPage();
    }, [fetchCurrentPage]);

    const fetchNext = useCallback(() => {
        if(currentPage >= 0 && currentPage < pageCount-1) {
            setCurrentPage(currentPage+1);
        }
    }, [currentPage, pageCount]);

    const fetchBefore = useCallback(() => {
        if(currentPage > 0 && currentPage <= pageCount-1) {
            setCurrentPage(currentPage-1);
        }
    }, [currentPage, pageCount]);

    /**
     * fetch 1 based indexed page of data.
     **/
    const fetchIndex = useCallback((index: number) => {
        if(index>=1 && index <= pageCount) {
            setCurrentPage(index-1);
        }
    }, [pageCount]);

    return {
        total: totalCount,
        itemPerPage: pageSize,
        pageCount,
        pageIndex: currentPage,
        pageData: items,
        fetchBefore,
        fetchNext,
        fetchIndex
    }
}

