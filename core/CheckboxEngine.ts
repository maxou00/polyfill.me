import OptionEngine from "./OptionEngine";
import { Clonable } from "./FieldEngine";


export default class CheckboxEngine extends OptionEngine implements Clonable<CheckboxEngine>{
    constructor(){
        super("checkbox","","");
    }

    public clone(){
        return new CheckboxEngine()
            .setKey(this.key)
            .setTitle(this.title)
            .setDescription(this.description)
            .setRequired(this.required)
            .overrideChoices(this.options);
    }
}