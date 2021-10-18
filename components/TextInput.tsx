
import React, { useState } from 'react'
import styled from 'styled-components'

const StyledLabel = styled.label`
    display: block;
    padding: 0.5rem;
`

const StyledInput = styled.input`
    display: block;
    font-size: 1.5rem;
    margin: 1rem;
    padding: 0.25rem;
    outline: none;
    border: none;
    border-bottom: solid 5px lightblue;
    transition: border 0.2s;
    will-change: border;

    &:focus {
        border-bottom: solid 8px lightblue;
    }
`

export default function TextInput({ name, isPassword=false, label=null, onChange=null }) {
    const [value, setValue] = useState('')

    return <>
        {label ? <StyledLabel htmlFor={name}>{label}</StyledLabel> : null}
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

