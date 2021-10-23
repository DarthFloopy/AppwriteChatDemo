
import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
    padding: 0.5rem;
    margin: 0.5rem;
    border: none;
    background: lightblue;
    border: solid 5px lightblue;
    cursor: pointer;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1em;

    &:hover, &:focus {
        background: transparent;
    }
    &:active {
        background: lightblue;
    }
`

export default Button
