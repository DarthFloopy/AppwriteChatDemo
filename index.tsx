
import { Appwrite } from 'appwrite'
import React from 'react'
import ReactDOM from 'react-dom'
import TextInput from './components/TextInput'

const appwrite = new Appwrite()

appwrite
    .setEndpoint('http://localhost:8080/v1')
    .setProject('616c95936708c')

ReactDOM.render(<TextInput name="input" isPassword={true} />,
        document.getElementById("app-root"))


