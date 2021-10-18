
import React, { useState } from 'react'
import Button from './Button'
import TextInput from './TextInput'

import styled from 'styled-components'

const StyledH2 = styled.h2`
    margin: 0.5rem;
`

export default function LoginBox({ onSubmit }) {
    const [usernameValue, setUsernameValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")

    return <div style={{"display": "flex", "flexDirection": "column"}}>
        <StyledH2>Log In</StyledH2>
        <TextInput label="Username" name="username" onChange={({value}) => {
            setUsernameValue(value)
        }} />
        <TextInput label="Password" name="password" isPassword={true} onChange={({value}) => {
            setPasswordValue(value)
        }} />
        <Button text="Submit" onClick={() => {
            onSubmit(usernameValue, passwordValue)
        }} />
    </div>
}


