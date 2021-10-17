
import React from 'react'
import TextInput from './TextInput'

import styled from 'styled-components'

const StyledH2 = styled.h2`
    margin: 0.5rem;
`

export default function LoginBox() {
    return <div style={{"display": "flex", "flexDirection": "column"}}>
        <StyledH2>Log In</StyledH2>
        <TextInput label="Username" name="username" />
        <TextInput label="Password" name="password" isPassword={true}/>
    </div>
}


