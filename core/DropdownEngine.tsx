import OptionEngine from "./OptionEngine";
import { Clonable } from "./FieldEngine";


export default class DropdownEngine extends OptionEngine implements Clonable<DropdownEngine>{
    constructor(){
        super("dropdown","","");
    }

    public clone(){
        return new DropdownEngine()
            .setKey(this.key)
            .setTitle(this.title)
            .setDescription(this.description)
            .setRequired(this.required)
            .overrideChoices(this.options);
    }
}