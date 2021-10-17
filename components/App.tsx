
import React from 'react'
import styled from 'styled-components'
import LoginBox from './LoginBox'

const CSSResetDiv = styled.div`
    margin: 0;
    padding: 0;
    font-family: Helvetica, sans-serif;
    font-size: 1.5rem;
`

export default function App() {
    return <CSSResetDiv>
        <LoginBox />
    </CSSResetDiv>
}

