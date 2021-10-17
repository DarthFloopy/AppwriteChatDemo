
import { Appwrite } from 'appwrite'

const appwrite = new Appwrite()

appwrite
    .setEndpoint('http://localhost:8080/v1')
    .setProject('616c95936708c')

document.body.innerHTML = 'test'

