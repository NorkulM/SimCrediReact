// @ts-nocheck
import { InputProps } from "@material-ui/core";
import React from "react"
import { IMaskInput } from "react-imask";

export interface Props extends InputProps{
    onChange: any,
}

const CEPMaskedInput = React.forwardRef(({
    onChange,
    ...rest
}: Props, ref) => {
    return (
        <IMaskInput
            inputRef={ref}
            onAccept={(value: string) => onChange && onChange({ target: { name: rest.name || "", value}})}
            radix=","
            mapToRadix={["."]}
            mask={"00000-000"}
            lazy={false}
            {...rest}
        />
    )
})

export default CEPMaskedInput;
