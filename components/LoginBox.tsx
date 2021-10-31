
// NOTE: THIS FILE IS OLD CODE AND IS NOT CURRENTLY IN USE.
// (You may have been looking for JoinRoomBox.tsx)

import React, { useState } from 'react'
import Heading from './Heading'
import Button from './Button'
import TextInput from './TextInput'

export default function LoginBox({ onSubmit }) {
    const [usernameValue, setUsernameValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")

    return <div style={{"display": "flex", "flexDirection": "column"}}>
        <Heading as="h2">Log In</Heading>
        <TextInput label="Username" name="username" onChange={({value}) => {
            setUsernameValue(value)
        }} />
        <TextInput label="Password" name="password" isPassword={true} onChange={({value}) => {
            setPasswordValue(value)
        }} />
        <Button onClick={() => {
            onSubmit(usernameValue, passwordValue)
        }}>Submit</Button>
    </div>
}


