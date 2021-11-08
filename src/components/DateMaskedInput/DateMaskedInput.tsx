// @ts-nocheck
import { InputProps } from "@material-ui/core";
import React from "react"
import { IMaskInput, IMask } from "react-imask";

export interface Props extends InputProps{
    onChange: any,
}

const DateMaskedInput = React.forwardRef(({
    onChange,
    ...rest
}: Props, ref) => {
    return (
        <IMaskInput
            inputRef={ref}
            onAccept={(value: string) => onChange && onChange({ target: { name: rest.name || "", value}})}
            radix=","
            mapToRadix={["."]}
            mask={"d/`m/`Y"}
            lazy={false}
            blocks={{
                d: {
                    mask: IMask.MaskedRange,
                    from: 1,
                    to: 31,
                    maxLength: 2,
                },
                m: {
                    mask: IMask.MaskedRange,
                    from: 1,
                    to: 12,
                    maxLength: 2,
                },
                Y: {
                    mask: IMask.MaskedRange,
                    from: 1900,
                    to: new Date().getFullYear(),
                    maxLength: 2,
                },
            }}
            {...rest}
        />
    )
})

export default DateMaskedInput;
