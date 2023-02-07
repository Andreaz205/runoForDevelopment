import {ElementRef} from "react";

export const getTransformValue = (ref: ElementRef<any>) => {
    let trfRegExp = /[-0-9.]+(?=px)/
    // @ts-ignore
    let style = ref.style.transform
    return +style.match(trfRegExp);
}