
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

    const [messagesText, setMessagesText] = useState("Loading...")

    const messagesViewRef = useRef(null)
    const messageBoxRef = useRef(null)
    const buttonRef = useRef(null)

    useEffect(() => {
        getMessagesByRoomName(roomName).then(messages => {
            console.log(messages)
            setMessagesText(messages.join("\n"))
            messagesViewRef.current.scrollTop =
                messagesViewRef.current.scrollHeight
        })

        onMessageListUpdated(roomName, newMessageList => {
            setMessagesText(newMessageList.join("\n"))
            messagesViewRef.current.scrollTop =
                messagesViewRef.current.scrollHeight
        })
    }, [])

    return <Container>
        <MessagesView ref={messagesViewRef}> {
            messagesText.split("\n").map(
                (line, index) => <p key={index}>{line}</p>
            )
        } </MessagesView>
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
