
import React from 'react'
import TextInput from './TextInput'

export default function LoginBox() {
    return <div>
        <h2>Log In</h2>
        <TextInput label="Username" name="username" />
        <TextInput label="Password" name="password" isPassword={true}/>
    </div>
}


