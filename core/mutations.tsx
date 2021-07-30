import React from "react";
import ShortTextEngine from "./ShortTextEngine";
import NumberEngine from "./NumberEngine";
import CheckboxEngine from "./CheckboxEngine";
import DateEngine from "./DateEngine";
import DropdownEngine from "./DropdownEngine";
import FieldEngine from "./FieldEngine";
import FileEngine from "./FileEngine";
import ParagraphEngine from "./ParagraphEngine";
import RadioEngine from "./RadioEngine";
import SliderEngine from "./SliderEngine";
import TimeEngine from "./TimeEngine";
import { FieldType } from "./global";
import { MdLooksOne, MdShortText, MdDescription, MdRadioButtonChecked, MdCheckBox, MdArrowDropDown, MdDateRange, MdTimer, MdLinearScale, MdInsertEmoticon, MdStar, MdCloudUpload, MdMore, MdWc } from "react-icons/md";
import EmotionEngine from "./EmotionEngine";
import RatingEngine from "./RatingEngine";

export function typeToEngine(type: FieldType){
    if(type === "shortText"){
        return new ShortTextEngine();
    }
    else if(type === "number"){
        return new NumberEngine();
    }
    else if(type === "checkbox"){
        return new CheckboxEngine();
    }
    else if(type === "date"){
        return new DateEngine();
    }
    else if(type === "dropdown"){
        return new DropdownEngine();
    }
    else if(type === "emotion"){
        return new EmotionEngine();
    }
    else if(type === "file"){
        return new FileEngine();
    }
    else if(type === "paragraph"){
        return new ParagraphEngine();
    }
    else if(type === "radio"){
        return new RadioEngine();
    }
    else if(type === "rating"){
        return new RatingEngine();
    }
    else if(type === "slider"){
        return new SliderEngine();
    }
    else if(type === "time"){
        return new TimeEngine();
    }
    else if(type === "gender"){
        return new RadioEngine().add("Homme","Femme","Transgenre");
    }
    else if(type === "YesOrNo"){
        return new RadioEngine().add("Oui","Non");
    }
    else if(type === "image"){
        return new FileEngine().allow("image");
    }
    else if(type === "audio"){
        return new FileEngine().allow("audio");
    }
    else if(type === "video"){
        return new FileEngine().allow("video");
    }
    else if(type === "marital_status"){
        return new RadioEngine().add("Marié","Divorcé","Célibataire","Fiancé");
    }
    else if(type === "sexual_orientation"){
        return new RadioEngine().add("Hétérosexuel","Homosexuel (Gay)","Homosexuel (Lesbienne)");
    }
    return new FieldEngine("shortText","","");
}

type Color = "inherit" | "action" | "error" | "disabled" | "primary" | "secondary";

export function typeToIcon(type: FieldType, color: Color){
    switch (type) {
        case "number":
            return <MdLooksOne color={color}/>;
        case "shortText":
            return <MdShortText color={color}/>
        case "paragraph":
            return <MdDescription color={color}/>
        case "radio":
            return <MdRadioButtonChecked color={color}/>
        case "checkbox":
            return <MdCheckBox color={color}/>
        case "dropdown":
            return <MdArrowDropDown color={color}/>
        case "date":
            return <MdDateRange color={color}/>
        case "time":
            return <MdTimer color={color}/>
        case "slider":
            return <MdLinearScale color={color}/>
        case "emotion":
            return <MdInsertEmoticon color={color}/>
        case "rating":
            return <MdStar color={color}/>
        case "file":
            return <MdCloudUpload color={color}/>
        case "gender":
            return <MdWc color={color}/>
        default:
            return <MdMore color={color}/>
    }
}