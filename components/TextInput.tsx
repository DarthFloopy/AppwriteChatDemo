
import React from 'react'
import styled from 'styled-components'

const StyledLabel = styled.label`
    display: block;
`

const StyledInput = styled.input`
    display: block;
    font-size: 1.5rem;
    margin: 2rem;
    padding: 0.5rem;
    outline: none;
    border: none;
    border-bottom: solid 5px lightblue;
    transition: border 0.2s;
    will-change: border;

    &:focus {
        border-bottom: solid 8px lightblue;
    }
`

export default function TextInput({ name, isPassword=false, label=null }) {
    return <>
        {label ? <StyledLabel htmlFor={name}>{label}</StyledLabel> : null}
        <StyledInput
            type={isPassword?"password":"text"}
            name={name} />
    </>
}

