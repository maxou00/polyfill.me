import OptionEngine from "./OptionEngine";
import { Clonable } from "./FieldEngine";
import { Emoji } from "./global";

export default class EmotionEngine extends OptionEngine<Emoji> implements Clonable<EmotionEngine>{

    constructor(){
        super("emotion","","");
    }

    public clone(){
        return new EmotionEngine()
            .setKey(this.key)
            .setTitle(this.title)
            .setDescription(this.description)
            .setRequired(this.required)
            .overrideChoices(this.options);
    }
}