
import { Appwrite } from "appwrite";

const sdk = new Appwrite()
sdk
    .setEndpoint('http://localhost:8080/v1')
    .setProject('616c95936708c')

const roomsDirectoryCollectionID = "61734789324d1"
const chatDataCollectionID = "61733d70ceb7f"

export async function getRoomsDirectory() {
    const response = await sdk.database.listDocuments(roomsDirectoryCollectionID)
    const result = {}
    for (const doc of response["documents"]) {
        result[doc["roomName"]] = doc["roomID"]
    }
    return result
}

export async function createNewRoom(roomName) {
    const dir = await getRoomsDirectory()
    if (dir.hasOwnProperty(roomName)) {
        throw Error(`room already exists with name: ${roomName}`)
    }

    const newDoc = await sdk.database.createDocument(chatDataCollectionID, {
        roomName: roomName,
        messages: []
    }, ["*"], ["*"])
    await sdk.database.createDocument(roomsDirectoryCollectionID, {
        roomName: roomName,
        roomID: newDoc["$id"]
    }, ["*"], ["*"])

    return newDoc
}

export async function deleteRoom(roomName) {
    const roomsDirectoryCollection =
        await sdk.database.listDocuments(roomsDirectoryCollectionID)

    const chatDataCollection =
        await sdk.database.listDocuments(chatDataCollectionID)

    // remove chat rooms
    for (const doc of chatDataCollection.documents.filter(doc => (doc.roomName == roomName))) {
        sdk.database.deleteDocument(chatDataCollectionID, doc["$id"])
    }

    // remove entries from rooms directory
    for (const doc of roomsDirectoryCollection.documents.filter(doc => (doc.roomName == roomName))) {
        sdk.database.deleteDocument(roomsDirectoryCollectionID, doc["$id"])
    }
}

