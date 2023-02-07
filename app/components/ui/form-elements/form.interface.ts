import {FieldError, FieldErrorsImpl, Merge} from "react-hook-form";
import {InputHTMLAttributes, SetStateAction} from "react";
import {Dispatch} from "react";
import {IDeliveryType} from "@/ui/Cart/IOrderInput";

export interface IFieldProps {
    radioPlaceholder?: string,
    onRadioClick?: Dispatch<SetStateAction<any>>,
    radioValue?: string,
    errorStyle?: any,
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined | any
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps

export interface IField extends TypeInputPropsField{}