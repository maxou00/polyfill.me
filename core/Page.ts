import FieldEngine, { Clonable } from "./FieldEngine";
import { generateMarker } from "./form_utils";

export class Page{
    public key: string;
    public title: string;
    public description: string;

    public fields: FieldEngine[];

    constructor(){
        this.key = generateMarker(8);
        this.title = "";
        this.description = "";
        this.fields = [];
    }

    protected setKey(key: string){
        this.key = key;
        return this;
    }

    public setTitle(name: string){
        this.title = name;
        return this;
    }

    public setDescription(desc: string){
        this.description = desc;
        return this;
    }

    public addField(...field: FieldEngine[]){
        this.fields.push(...field);
        return this;
    }

    public removeField(field: string){
        this.fields = this.fields.filter((f) => f.key !==field);
        return this;
    }
 
    public updateField(field: FieldEngine){
        let index = this.fields.findIndex((f) => f.key === field.key);
        if(index !== -1){
            this.fields[index] = field;
        }
        return this;
    }

    public clearFields(){
        this.fields = [];
        return this;
    }

    public get copy(){
        return new Page()
            .setKey(this.key)
            .setTitle(this.title)
            .setDescription(this.description)
            .addField(...this.fields);
    }
}