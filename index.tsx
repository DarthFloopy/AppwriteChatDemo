
import { Appwrite } from 'appwrite'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

const appwrite = new Appwrite()

appwrite
    .setEndpoint('http://localhost:8080/v1')
    .setProject('616c95936708c')

ReactDOM.render(<App />,
        document.getElementById("app-root"))


