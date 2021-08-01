export type FieldType = "text" 
    | "number"
    | "selection"
    | "file"

export type FieldFormat = "short" 
    | "paragraph" 
    | "rich" 
    | "email" 
    | "date" 
    | "time" 
    | "datetime" 
    | "dropdown" 
    | "radio" 
    | "checkbox" 
    | "chip"
    | "image"
    | "video"

export interface CommonFieldProps {
    key: string;
    type: FieldType;
    format?: FieldFormat;
    title: string;
    description: string;
    required: boolean;
}

interface TextConstraints {
    type: "text",
    maxChars?: number,
    expression?: string
}

interface RangeableValue {
    min: number;
    max: number;
}

interface NumberConstraints extends Partial<RangeableValue> {
    type: "number"
}

interface DateConstraints extends NumberConstraints {
    format: 'date'
}

interface TimeConstraints extends NumberConstraints {
    format: 'time'
}

interface DateTimeConstraints extends NumberConstraints {
    format: 'datetime'
}

interface RangeConstraints extends RangeableValue {
    type: "range"
    step: number
}

interface IntervalConstraints extends RangeableValue {
    type: "interval",
    step: number
}

interface FileConstaints {
    type: "file"
    maxSizeInKb: number; // in kb
    acceptedFormats?: string[];
}

interface SelectionConstraints<T = any> {
    type: "selection"
    options:T[];
    allowCustomValue: boolean,
    selection: 'single' | 'multiple',
    maxSelection?: number
}

interface DecorableOption {
    value: string;
    description: string;
    image: string;
}

type Field<T> = CommonFieldProps & T;
type TextField<T> = Field<TextConstraints & T>;
type SelectField<T> = Field<SelectionConstraints & T>;
export type FileField<T = {}> = Field<FileConstaints & T>;

export type SingleLineField = TextField<{ format: "short" }>

export type RichTextField = TextField<{ format: "rich" }>

export type ParagraphField = TextField<{ format: "paragraph" }>

export type EmailField = TextField<{ format: "email" }>

export type NumberField = Field<NumberConstraints>

export type DateField = Field<DateConstraints>

export type TimeField = Field<TimeConstraints>

export type DateTimeField = Field<DateTimeConstraints>

export type DropdownField = SelectField<{ format: 'dropdown', selection: 'single' }>

export type RadioField = SelectField<{ format: 'radio', selection: 'single' }>

export type CheckboxField = SelectField<{ format: "checkbox", selection: 'multiple' }>

export type ChipField = SelectField<{ format: "chip" }>

export type ImageField = FileField<{ format: 'image', acceptedFormats: ['image/*'] }>

export type VideoField = FileField<{ format: 'video', acceptedFormats: ['video/*'] }>

export type ContentField =
                        SingleLineField 
                        | RichTextField
                        | ParagraphField
                        | EmailField
                        | NumberField
                        | DateField
                        | TimeField
                        | DateTimeField
                        | DropdownField
                        | RadioField
                        | CheckboxField
                        | ChipField
                        | FileField
                        | ImageField
                        | VideoField