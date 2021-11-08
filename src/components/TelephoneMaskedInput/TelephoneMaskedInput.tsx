// @ts-nocheck
import { InputProps } from "@material-ui/core";
import React from "react"
import { IMaskInput } from "react-imask";

export interface Props extends InputProps{
    onChange: any,
}

const TelephoneMaskedInput = React.forwardRef(({
    onChange,
    ...rest
}: Props, ref) => {
    return (
        <IMaskInput
            inputRef={ref}
            onAccept={(value: string) => onChange && onChange({ target: { name: rest.name || "", value}})}
            radix=","
            mapToRadix={["."]}
            mask={[{
                mask: "(00) 0000-0000"
            }, {
                mask: "(00) 00000-0000"
            }]}
            {...rest}
        />
    )
})

export default TelephoneMaskedInput;
