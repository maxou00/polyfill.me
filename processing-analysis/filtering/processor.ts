import { FilterChain } from ".";
import { DataForm, FormResponse } from "../../engine/page";

export class FilterChainProcessor {
    chain: FilterChain;
    schema: DataForm;
    dataset: FormResponse[];

    nextStage(previousStageDataset: FormResponse[], chainPosition: FilterChain) {
        if(chainPosition.type === "single"){
            //chainPosition.
        }
    
    }

    run() {
        return this.nextStage(this.dataset, this.chain);
    }
}