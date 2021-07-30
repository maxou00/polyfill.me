import FieldEngine, { Clonable } from "./FieldEngine"

export default class NumberEngine extends FieldEngine implements Clonable<NumberEngine>{

    public enableLimit: boolean;
    public minimum: number;
    public maximum: number;

    constructor(){
        super("number","","");
        this.enableLimit = false;
        this.minimum = 0;
        this.maximum = 0;
    }

    public activateLimits(){
        this.enableLimit = true;
        return this;
    }

    public deactivateLimits(){
        this.enableLimit = false;
    }

    protected overrideLimits(enable: boolean){
        this.enableLimit = enable;
        return this;
    }

    public setMaximum(maximum: number){
        this.activateLimits();
        this.maximum = maximum;

        return this;
    }

    public setMinimum(min: number){
        this.activateLimits();
        this.minimum = min;
        return this;
    }

    public clone(){
        return new NumberEngine()
            .setKey(this.key)
            .setTitle(this.title)
            .setDescription(this.description)
            .setRequired(this.required)
            .overrideLimits(this.enableLimit)
            .setMaximum(this.maximum)
            .setMinimum(this.minimum);
    }
}