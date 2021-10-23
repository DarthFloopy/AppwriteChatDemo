
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { getMessages } from "../dbapis"

export default function RoomGUI({ roomName }) {

    const [messagesText, setMessagesText] = useState("")

    useEffect(() => {
        getMessages(roomName).then(messages => {
            console.log(messages)
            setMessagesText(messages.join("\n"))
        })
    }, [])

    return <>
        <div> {
            messagesText.split("\n").map(
                line => <p key={line}>{line}</p>
            )
        } </div>
    </>
}
