import FieldEngine, { Clonable } from "./FieldEngine";


export default class SliderEngine extends FieldEngine implements Clonable<SliderEngine>{

    public minimum: number;
    public maximum: number;
    public step: number;

    constructor(){
        super("slider","","");
        this.minimum = 0;
        this.step = 1;
        this.maximum = this.minimum + this.step;
    }

    public setStep(step: number){
        this.step = step;
        return this;
    }

    public setMinimum(min: number){
        this.minimum = min;
        if(this.maximum <= this.minimum){
            this.maximum = this.minimum+this.step;
        }
        return this;
    }

    public setMaximum(max: number){
        this.maximum = max;
        if(this.maximum <= this.minimum){
            this.maximum = this.minimum+this.step;
        }
        return this;
    }

    public clone(){
        return new SliderEngine()
            .setKey(this.key)
            .setTitle(this.title)
            .setDescription(this.description)
            .setRequired(this.required)
            .setStep(this.step)
            .setMaximum(this.maximum)
            .setMinimum(this.minimum)
    }
}