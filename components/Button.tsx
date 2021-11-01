
import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
    padding: 0.5rem;
    margin: 0.5rem;
    border: none;
    background: #f02e65;
    border: solid 5px #f02e65;
    cursor: pointer;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1em;

    &:hover, &:focus {
        background: transparent;
    }
    &:active {
        background: #f02e65;
    }
`

export default Button
