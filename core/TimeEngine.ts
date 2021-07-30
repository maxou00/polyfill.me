import FieldEngine, { Clonable } from "./FieldEngine";


export default class TimeEngine extends FieldEngine implements Clonable<TimeEngine>{

    constructor(){
        super("time","","");
    }

    public clone(){
        return new TimeEngine()
            .setKey(this.key)
            .setTitle(this.title)
            .setDescription(this.description)
            .setRequired(this.required);
    }
}