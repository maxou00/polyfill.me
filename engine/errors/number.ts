import { NumberField } from "../fields";
import { ValidationFunction } from "./base";

const numberErrors: ValidationFunction = (q: NumberField, r: any) => {
    return undefined;
}

export default numberErrors;