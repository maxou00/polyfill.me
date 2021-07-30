import FieldEngine, { Clonable } from "./FieldEngine";

export default class RatingEngine extends FieldEngine implements Clonable<RatingEngine>{
    public stars: number;

    constructor(){
        super("rating","","");
        this.stars = 5;
    }

    public setStars(stars: number){
        if(stars < 1){
            stars = 1;
        }
        this.stars = stars;
        return this;
    }

    public setStarFromStr(stars: string){
        return this.setStars(parseInt(stars) || 0);
    }

    public clone(){
        return new RatingEngine()
            .setKey(this.key)
            .setTitle(this.title)
            .setDescription(this.description)
            .setRequired(this.required)
            .setStars(this.stars);
    }
}