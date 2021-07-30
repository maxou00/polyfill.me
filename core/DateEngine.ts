import FieldEngine, { Clonable } from "./FieldEngine";


export default class DateEngine extends FieldEngine implements Clonable<DateEngine>{

    constructor(){
        super("date","","");
    }

    public clone(){
        return new DateEngine()
            .setKey(this.key)
            .setTitle(this.title)
            .setDescription(this.description)
            .setRequired(this.required);
    }
}