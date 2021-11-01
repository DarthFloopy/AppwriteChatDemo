
import React, { useState } from 'react'
import styled from 'styled-components'

const StyledLabel = styled.label`
    display: block;
    padding: 0.5rem;
`

const ErrorLabel = styled(StyledLabel)`
    color: red;
`

const StyledInput = styled.input`
    display: block;
    font-size: 1.5rem;
    margin: 1rem;
    padding: 0.25rem;
    outline: none;
    border: none;
    border-bottom: solid 5px #f02e65;
    transition: border 0.2s;
    will-change: border;
    max-width: 60vw;

    &:focus {
        border-bottom: solid 8px #f02e65;
    }
`

export default function TextInput(
    { name, isPassword=false, label=null, errMsg=null, onChange=null }
) {
    const [value, setValue] = useState('')

    return <>
        {label && <StyledLabel htmlFor={name}>{label}</StyledLabel>}
        {errMsg && <ErrorLabel htmlFor={name}>{errMsg}</ErrorLabel>}
        <StyledInput
            type={isPassword?"password":"text"}
            name={name}
            value={value}
            onChange={event => {
                setValue(event.target.value)
                if (onChange) {
                    onChange({ value: event.target.value })
                }
            }}/>
    </>
}

