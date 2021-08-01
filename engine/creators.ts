import { nanoid } from "nanoid";
import { CheckboxField, ChipField, CommonFieldProps, ContentField, DateField, DateTimeField, DropdownField, EmailField, FieldType, FileField, ImageField, NumberField, ParagraphField, RadioField, RichTextField, SingleLineField, TimeField, VideoField } from "./fields";

export function commonField(type: FieldType): CommonFieldProps {
    return {
        key: nanoid(),
        type,
        title: "",
        description: "",
        required: true,
    }
}

export function initialShortText(): SingleLineField {
    return {
        ...commonField("text"),
        format: "short",
    } as SingleLineField;
}

export function initialRichText(): RichTextField {
    return  {
        ...commonField("text"),
        format: "rich"
    } as RichTextField
}

export function initialParagraph(): ParagraphField {
    return {
        ...commonField("text"),
        format: "paragraph"
    } as ParagraphField
}

export function initialEmail(): EmailField {
    return {
        ...commonField("text"),
        format: "email"
    } as EmailField
}

export function initialNumber(): NumberField {
    return {
        ...commonField("number"),
    } as NumberField
}

export function initialDate(): DateField {
    return {
        ...commonField("number"),
        format: "date"
    } as DateField
}

export function initialTime(): TimeField {
    return {
        ...commonField("number"),
        format: "time"
    } as TimeField
}

export function initialDateTime(): DateTimeField {
    return {
        ...commonField("number"),
        format: "datetime"
    } as DateTimeField
}

export function initialDropdownField(): DropdownField {
    return {
        ...commonField("selection"),
        format: "dropdown",
        allowCustomValue: false, 
        options: [],
        selection: "single"
    } as DropdownField
}

export function initialRadioField(): RadioField {
    return {
        ...commonField("selection"),
        format: "radio",
        allowCustomValue: false, 
        options: [],
        selection: "single"
    } as RadioField
}

export function initialCheckboxField(): CheckboxField {
    return {
        ...commonField("selection"),
        format: "checkbox",
        allowCustomValue: false, 
        options: [],
        selection: "multiple"
    } as CheckboxField
}

export function initialChipField(): ChipField {
    return {
        ...commonField("selection"),
        format: "chip",
        allowCustomValue: false, 
        options: [],
        selection: "single"
    } as ChipField
}

export function initialFileField(): FileField {
    return {
        ...commonField("file"),
        maxSizeInKb: 1024,
    } as FileField
}

export function initialImageField(): ImageField {
    return {
        ...commonField("file"),
        format: "image",
        maxSizeInKb: 5 * 1024,
        acceptedFormats: ["image/*"]
    } as ImageField
}

export function initialVideoField(): VideoField {
    return {
        ...commonField("file"),
        format: "video",
        maxSizeInKb: 25 * 1024,
        acceptedFormats: ["video/*"]
    } as VideoField
}


export const FieldCreators = {
    text_short: initialShortText,
    text_rich: initialRichText,
    text_paragraph: initialParagraph,
    text_email: initialEmail,
    number: initialNumber,
    number_date: initialDate,
    number_time: initialTime,
    number_datetime: initialDateTime,
    selection_dropdown: initialDropdownField,
    selection_radio: initialRadioField,
    selection_checkbox: initialCheckboxField,
    selection_chip: initialChipField,
    file: initialFileField,
    file_image: initialImageField,
    file_video: initialVideoField
}


export function fieldCode(field: ContentField) {
    return `field_${field.type}${field.format ? "_"+field.format : ""}`
}