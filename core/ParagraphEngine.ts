import FieldEngine, { Clonable } from "./FieldEngine";


export default class ParagraphEngine extends FieldEngine implements Clonable<ParagraphEngine>{

    constructor(){
        super("paragraph","","");
    }

    public clone(){
        return new ParagraphEngine()
            .setKey(this.key)
            .setTitle(this.title)
            .setDescription(this.description)
            .setRequired(this.required);
    }

}

