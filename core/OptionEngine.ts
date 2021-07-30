import FieldEngine from "./FieldEngine";
import { FieldType } from "./global";
import { generateOptionKey } from "./form_utils";

interface Choices<T>{
    [key:string]: T;
}

export default class OptionEngine<T = string> extends FieldEngine{
    public options: Choices<T>;

    constructor(type: FieldType, title: string, desc: string){
        super(type,title,desc);
        this.options = {};
    }

    protected overrideChoices(choices: Choices<T>){
        this.options = choices;
        return this;
    }

    public add(...option: T[]){
        option.forEach((op) => {
            let index = Object.values(this.options).findIndex((o) => o === op);
            if(index === -1){
                this.options[generateOptionKey()] = op;
            }
        })
        return this;
    }

    public remove(id: string){
        if(this.options[id]){
            delete this.options[id];
        }
        return this;
    }

    public update(key: string, value: T){
        this.options[key] = value;
        return this;
    }

    public clearChoices(){
        this.options = {};
    }
}