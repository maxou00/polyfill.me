import { FieldType } from "./global";
import {nanoid} from "nanoid";

export function generateMarker(length:number = 4):string{
    return nanoid(length);
}

export function generateFieldKey(): string{
    return `field__${generateMarker(8)}`;
}
 
export function generateOptionKey(): string{
    return `option__${generateMarker(8)}`;
}

export function typeToReadable(type: FieldType){
    if(type === "shortText"){
        return "Texte court";
    }
    else if(type === "number"){
        return "Nombre";
    }
    else if(type === "checkbox"){
        return "Case a cocher";
    }
    else if(type === "date"){
        return "Date";
    }
    else if(type === "dropdown"){
        return "Menu deroulant";
    }
    else if(type === "emotion"){
        return "Emotion";
    }
    else if(type === "file"){
        return "Fichier";
    }
    else if(type === "paragraph"){
        return "Paragraphe/Long texte";
    }
    else if(type === "radio"){
        return "Choix multiple";
    }
    else if(type === "rating"){
        return "Evaluation";
    }
    else if(type === "slider"){
        return "Intervalle";
    }
    else if(type === "time"){
        return "Heure";
    }
    else if(type === "gender"){
        return "Genre";
    }
    else if(type === "YesOrNo"){
        return "Oui/Non";
    }
    else if(type === "image"){
        return "Image";
    }
    else if(type === "audio"){
        return "Audio";
    }
    else if(type === "video"){
        return "Vidéo";
    }
    else if(type === "marital_status"){
        return "Situation matrimoniale";
    }
    else if(type === "sexual_orientation"){
        return "Orientation Sexuelle";
    }
    return "";
}