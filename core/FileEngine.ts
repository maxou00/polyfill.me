import FieldEngine, { Clonable } from "./FieldEngine";
import { FileType } from "./global";

export default class FileEngine extends FieldEngine implements Clonable<FileEngine>{
    public accept: FileType[];
    public maximumSize: number;
    public maximumCount: number;

    constructor(){
        super("file","","");
        this.maximumSize = 1024;
        this.accept = [];
        this.maximumCount = 1;
    }

    public setCount(count: number){
        this.maximumCount = count;
        return this;
    }

    public setMaximumSize(size: number){
        this.maximumSize = size;
        return this;
    }

    public allow(...type: FileType[]){
        type.forEach((t) => {
            if(!this.accept.includes(t)){
                this.accept.push(t);
            }
        })
        return this;
    }

    public isAllowed(type: FileType){
        return this.accept.includes(type);
    }

    public get allAccepted(){
        return this.isAllowed('all');
    }

    public allowAll(){
        this.accept = [];
        this.accept.push("all");
        return this;
    }

    public clearAll(){
        this.accept = [];
        return this;
    }

    public remove(type: FileType){
        this.accept = this.accept.filter((t)=>t!==type);
        return this;
    }

    public clone(){
        return new FileEngine()
            .setKey(this.key)
            .setTitle(this.title)
            .setDescription(this.description)
            .setRequired(this.required)
            .allow(...this.accept)
            .setMaximumSize(this.maximumSize)
            .setCount(this.maximumCount);
    }
}