import { FieldType } from "./global";
import { generateFieldKey } from "./form_utils";

export interface Clonable<T extends FieldEngine = FieldEngine>{
    clone(): T;
}

export default class FieldEngine implements Clonable{
    public type: FieldType;
    public required: boolean;
    public key: string;
    public title: string;
    public description: string;

    constructor(type: FieldType, title: string, desc: string){
        this.key = generateFieldKey();
        this.type = type;
        this.title = title;
        this.description = desc;
        this.required = false;
    }

    protected setKey(key: string){
        this.key = key;
        return this;
    }
    
    public setTitle(title: string){
        this.title = title;
        return this;
    }

    public setDescription(desc: string){
        this.description = desc;
        return this;
    }

    public setRequired(required: boolean = true){
        this.required = required;
        return this;
    }

    public clone(){
        return new FieldEngine(this.type, this.title, this.description)
            .setRequired(this.required);
    }
}
