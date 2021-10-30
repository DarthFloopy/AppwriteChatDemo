
import { Appwrite } from "appwrite";
import { projectID, chatMessagesCollectionID } from "./config"

const sdk = new Appwrite()
sdk
    .setEndpoint(`http://${window.location.hostname}:8080/v1`)
    .setProject(projectID)


export async function countMessagesInRoom(roomName) {
    const response = await sdk.database.listDocuments(
        chatMessagesCollectionID, [`roomName=${roomName}`]
    )
    return response.sum
}

export async function deleteRoom(roomName) {
    const filteredChatDataCollection =
        await sdk.database.listDocuments(
            chatMessagesCollectionID,
            [`roomName=${roomName}`]
        )

    // remove messages in room
    for (const doc of filteredChatDataCollection.documents) {
        sdk.database.deleteDocument(chatMessagesCollectionID, doc["$id"])
    }
}

export async function getMessagesByRoomName(roomName) {
    const response = await sdk.database.listDocuments(
        chatMessagesCollectionID,
        [`roomName=${roomName}`]
    )
    return response.documents
}


export async function sendMessage(roomName, message, sender) {
    return sdk.database.createDocument(chatMessagesCollectionID, {
        roomName: roomName,
        messageData: message,
        sender: sender,
        timestamp: Date.now()
    }, ["*"], ["*"])  // world-writable may not be optimal but it's convenient :P
}


export function onMessageListUpdated(roomName, callback) {
    sdk.subscribe(`documents`, response => {
        if (response.payload.roomName == roomName)
            callback(response.payload)
    })
}


