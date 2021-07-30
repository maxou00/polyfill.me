import {FormEngine} from "./FormEngine";
import FieldEngine from "./FieldEngine";
import ShortTextEngine from "./ShortTextEngine";
import NumberEngine from "./NumberEngine";
import ParagraphEngine from "./ParagraphEngine";
import CheckboxEngine from "./CheckboxEngine";
import RadioEngine from "./RadioEngine";
import DropdownEngine from "./DropdownEngine";
import DateEngine from "./DateEngine";
import TimeEngine from "./TimeEngine";
import SliderEngine from "./SliderEngine";
import EmotionEngine from "./EmotionEngine";
import RatingEngine from "./RatingEngine";
import FileEngine from "./FileEngine";

export interface KeyValue {
    [key:string]:any ;
} 
    
export type FieldType = "number"|"shortText"|"paragraph"|"radio"|"checkbox"|"dropdown"|"date"|"time"|"slider"|"file"|"emotion"|"rating" | string ;

export interface FormField {
    [key: string]:any;
    key: string;
    type: FieldType;
    title: string;
    description: string;
    required: boolean;
}

export type FileType = "all" | "image" | "audio" | "video" | "pdf" | "word" | "excel" | "powerpoint";

export const field_types: FieldType[] = [
    "number",
    "shortText",
    "paragraph",
    "date",
    "time",
    "checkbox",
    "dropdown",
    "radio",
    "rating",
    "slider",
    "emotion",
    "file",
    "YesOrNo",
    "image",
    "video",
    "audio",
    "gender",
    "marital_status",
    "sexual_orientation"
];

export const supportedLocales:{[key: string]: string} = {
    fr_FR: "Francais (France)",
    en_US: "English (US)"
}

export interface  BuilderProps<T extends FieldEngine = FieldEngine> {
    engine: T;
    onChange?(engine: T): void;
    onDelete?(key: string):void;
}

export type SupportedLocales = "fr_FR" | "en_US";

export interface BuilderState{
    form: FormEngine;
    currentSection: string;
}

export interface AppState{
    builderState: BuilderState;
}

export interface EmojiList{
    [key: string]: Emoji;
}

export interface Emoji{
    code: string;
    name: string;
}

export interface HostedFile{
    url: string;
    tag: string;
}