
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import Button from "./Button"
import { sendMessage, onMessageListUpdated, getMessagesByRoomName } from "../dbapis"


const Container = styled.div`
    margin: 0;
    padding: 0.5rem;
`

const MessagesView = styled.div`
    outline: solid 1px darkgray;
    padding: 0.5rem;
    max-height: 80vh;
    overflow-y: scroll;
`

const MessageInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 0.5rem;
`

const MessageInput = styled.input`
    padding: 0.5rem;
    flex-grow: 1;
    font-size: 1rem;
`
const MessageSendButton = styled(Button)`
    margin: 0;
    margin-left: 0.5rem;
`


export default function RoomGUI({ roomName }) {

    const messagesViewRef = useRef(null)
    const messageBoxRef = useRef(null)
    const buttonRef = useRef(null)

    useEffect(() => {
        getMessagesByRoomName(roomName).then(messageDocs => {
            const messages = messageDocs.map(doc => doc.messageData)
            console.log(messages)
            console.log(messagesViewRef)
            messagesViewRef.current.innerHTML = messages.join("<br>")
            messagesViewRef.current.scrollTop =
                messagesViewRef.current.scrollHeight
        })

        onMessageListUpdated(roomName, newMessageDoc => {
            console.log(newMessageDoc)
            messagesViewRef.current.innerHTML += `<br>${newMessageDoc.messageData}`
            messagesViewRef.current.scrollTop =
                messagesViewRef.current.scrollHeight
        })
    }, [])

    return <Container>
        <MessagesView ref={messagesViewRef}>Loading...</MessagesView>
        <MessageInputContainer>
            <MessageInput
                name="messageinput"
                id="messageinput"
                ref={messageBoxRef}
                onKeyDown={e => {
                    if (!e.key) throw Error("key event has no .key prop")
                    if (e.key == "Enter")
                        buttonRef.current.click()
                }} />
            <MessageSendButton
                ref={buttonRef}
                onClick={e => {
                    const message = messageBoxRef.current.value.trim()
                    if (message) {
                        sendMessage(roomName, message, "bob")
                        messageBoxRef.current.value = ""
                    }
                }}
                > ➤ </MessageSendButton>
        </MessageInputContainer>
    </Container>
}
