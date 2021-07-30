import FieldEngine, { Clonable } from "./FieldEngine";

export default class ShortTextEngine extends FieldEngine implements Clonable<ShortTextEngine>{

    constructor(){
        super("shortText","","");
    }

    public clone(){
        return new ShortTextEngine()
            .setKey(this.key)
            .setTitle(this.title)
            .setDescription(this.description)
            .setRequired(this.required);
    }
}