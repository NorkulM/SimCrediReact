// @ts-nocheck
import { InputProps } from "@material-ui/core";
import React from "react"
import { IMaskInput } from "react-imask";

export interface Props extends InputProps{
    onChange: any,
}

const AccountNumberMaskedInput = React.forwardRef(({
    onChange,
    ...rest
}: Props, ref) => {
    return (
        <IMaskInput
            inputRef={ref}
            onAccept={(value: string) => onChange && onChange({ target: { name: rest.name || "", value}})}
            radix=","
            mapToRadix={["."]}
            mask={"0000[0000000000000000]-0"}
            unmask={true}
            lazy={false}
            {...rest}
        />
    )
})

export default AccountNumberMaskedInput;
