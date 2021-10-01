import { supaClient } from "../core/utils"
import  axios from "axios";
import { FormResponse } from "../engine/page";

interface Paginated<T> {
    total: number;
    items: T[];
}

export class FilterProvider {

    async getDataset(schemaId:string, filterId: string, count: number = 25, page : number = 1): Promise<Paginated<FormResponse> | undefined> {
        let token = supaClient.auth.session().access_token;

        let params = new URLSearchParams();
        if(count > 0) {
            params.set("count",count+"");
        }
        if(page > 0) {
            params.set("page", page+"");
        }

        return axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/schemas/${schemaId}/filters/${filterId}?${params.toString()}`,
            {
                headers: {
                    'authorization': `supabase ${token}`
                }
            }
        )
        .then(({data}) => {
            if(data.success) {
                return data.data as Paginated<FormResponse>;
            }
        })
        .catch(() => {
            return undefined;
        })
    }
}