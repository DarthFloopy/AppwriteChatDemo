
import { Appwrite } from "appwrite";

const sdk = new Appwrite()
sdk
    .setEndpoint('http://localhost:8080/v1')
    .setProject('616c95936708c')

const chatMessagesCollectionID = "61786197045a7"

export async function getAllRoomNames() {
    const response = await sdk.database.listDocuments(chatMessagesCollectionID)
    return [...new Set(response.documents.map(doc => doc.roomName))]
}

export async function deleteRoom(roomName) {
    const chatDataCollection =
        await sdk.database.listDocuments(chatMessagesCollectionID)

    // remove messages in room
    for (const doc of chatDataCollection.documents.filter(doc => (doc.roomName == roomName))) {
        sdk.database.deleteDocument(chatMessagesCollectionID, doc["$id"])
    }
}

export async function getMessagesByRoomName(roomName) {
    const response = await sdk.database.listDocuments(chatMessagesCollectionID)
    return response.documents.filter(doc => doc.roomName == roomName)
}


export async function sendMessage(roomName, message, sender) {
    return sdk.database.createDocument(chatMessagesCollectionID, {
        roomName: roomName,
        messageData: message,
        sender: sender,
        timestamp: Date.now()
    }, ["*"], ["*"])
}


export function onMessageListUpdated(roomName, callback) {
    sdk.subscribe(`documents`, response => {
        if (response.payload.roomName == roomName)
            callback(response.payload)
    })
}


