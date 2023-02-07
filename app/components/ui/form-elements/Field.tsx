import React, {forwardRef} from 'react';
import {IField} from "@/ui/form-elements/form.interface";
import cn from "classnames";
import checkboxStyles from './CustomCheckbox.module.scss'

const Field = forwardRef<HTMLInputElement,IField>(({
    error,
    type = 'text',
    style,
    radioPlaceholder,
    onRadioClick,
    radioValue,
    errorStyle, ...rest

}, ref) => {
    return <div style={style} className={cn({[checkboxStyles.radio]: type === 'radio'})}>
        <input type={type} ref={ref} {...rest} />
        {error && <div style={errorStyle}>{error.message}</div>}
        {type === 'radio' &&  radioPlaceholder && onRadioClick && radioValue &&
            <label form={rest.id} onClick={() => onRadioClick(radioValue)}>{radioPlaceholder}</label>}
    </div>
})

Field.displayName = 'Field'

export default Field;