import OptionEngine from "./OptionEngine";
import { Clonable } from "./FieldEngine";


export default class RadioEngine extends OptionEngine implements Clonable<RadioEngine>{
    constructor(){
        super("radio","","");
    }

    public clone(){
        return new RadioEngine()
            .setKey(this.key)
            .setTitle(this.title)
            .setDescription(this.description)
            .setRequired(this.required)
            .overrideChoices(this.options);
    }
}