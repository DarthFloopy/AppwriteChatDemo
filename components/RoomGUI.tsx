
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import Button from "./Button"
import { sendMessage, onMessageListUpdated, getMessagesByRoomName } from "../dbapis"


const Container = styled.div`
    margin: 0;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
`

const MessagesView = styled.div`
    outline: solid 1px darkgray;
    padding: 0.5rem;
    overflow-y: scroll;
    flex-grow: 1;
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


const TopBarContainer = styled.div`
    margin: 0;
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const TopBarHeading = styled.h2`
    overflow-x: auto;
    margin-left: 0.5rem;
    text-align: left;
`
function TopBar({ roomName, onBackButtonClicked }) {
    return <TopBarContainer>
        <Button style={{"margin":0}} onClick={onBackButtonClicked}>Back</Button>
        <TopBarHeading>{roomName}</TopBarHeading>
    </TopBarContainer>
}

export default function RoomGUI({ roomName, userName, onExit }) {

    const messagesViewRef = useRef(null)
    const messageBoxRef = useRef(null)
    const buttonRef = useRef(null)

    const displayNewMessage = (messageDoc, scrollToBottom=true) => {
            messagesViewRef.current.innerHTML +=
                `\n<p title="timestamp: ${messageDoc.timestamp}">` +
                    `<b>${messageDoc.sender}</b>: ` +
                    `${messageDoc.messageData}` +
                `</p>`

            if (scrollToBottom)
                messagesViewRef.current.scrollTop =
                    messagesViewRef.current.scrollHeight
    }

    const displayAllMessages = () => {
        getMessagesByRoomName(roomName).then(messageDocs => {
            messagesViewRef.current.innerHTML = ""
            for (const doc of messageDocs)
                displayNewMessage(doc, false)

            messagesViewRef.current.scrollTop =
                messagesViewRef.current.scrollHeight
        })
    }

    useEffect(() => {
        displayAllMessages()

        onMessageListUpdated(roomName, newMessageDoc => {
            displayNewMessage(newMessageDoc)
        })
    }, [])

    return <Container>
        <TopBar roomName={roomName} onBackButtonClicked={onExit} />
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
                        sendMessage(roomName, message, userName)
                        messageBoxRef.current.value = ""
                        messageBoxRef.current.focus()
                    }
                }}
                > ➤ </MessageSendButton>
        </MessageInputContainer>
    </Container>
}
