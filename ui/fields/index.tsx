import { ContentField } from "../../engine/fields"
import { Checkbox } from "./Checkbox"
import { Chip } from "./Chip"
import { Date as DateField } from "./Date"
import { Datetime } from "./Datetime"
import { Dropdown } from "./Dropdown"
import { Email } from "./Email"
import { File } from "./File"
import { Image } from "./Image"
import { Number as NumberField } from "./Number"
import { Paragraph } from "./Paragraph"
import { Radio } from "./Radio"
import { RichText } from "./RichText"
import { ShortText } from "./ShortText"
import { Time } from "./Time"
import { Video } from "./Video"

export interface FieldEditorProps {
    field: ContentField;
    pageId: string;
}

const Field = {
    ShortText: ShortText,
    RichText: RichText,
    Paragraph: Paragraph,
    Email: Email,
    Number: NumberField,
    Date: DateField,
    Time: Time,
    DateTime: Datetime,
    Dropdown: Dropdown,
    Radio: Radio,
    Checkbox: Checkbox,
    Chip: Chip,
    File: File,
    Image: Image,
    Video: Video
}

export default Field;