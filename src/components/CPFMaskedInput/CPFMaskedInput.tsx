// @ts-nocheck
import { InputProps } from "@material-ui/core";
import React from "react"
import { IMaskInput } from "react-imask";

export interface Props extends InputProps{
    onChange: any,
}

const CPFMaskedInput = React.forwardRef(({
    onChange,
    ...rest
}: Props, ref) => {
    return (
        <IMaskInput
            inputRef={ref}
            onAccept={(value: string) => onChange && onChange({ target: { name: rest.name || "", value}})}
            radix=","
            mapToRadix={["."]}
            unmask={true}
            lazy={false}
            overwrite
            autofix
            mask="000.000.000-00"
            {...rest}
        />
    )
})

export default CPFMaskedInput;
