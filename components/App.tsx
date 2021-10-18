
import React from 'react'
import LoginBox from './LoginBox'

export default function App() {
    return <LoginBox onSubmit={(usernameValue, passwordValue) => {
        console.log(usernameValue, passwordValue)
    }} />
}

