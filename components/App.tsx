
import { Appwrite } from "appwrite";
import React from "react";
import LoginBox from './LoginBox'

export default function App() {
    return <LoginBox onSubmit={(usernameValue, passwordValue) => {
        const appwrite = new Appwrite()

        appwrite
            .setEndpoint('http://localhost:8080/v1')
            .setProject('616c95936708c')

        appwrite.account.createSession(usernameValue, passwordValue)
            .then(response => console.log(response))
            .catch(console.log)

    }} />
}

