
import React, { useState } from 'react'
import Heading from './Heading'
import Button from './Button'
import TextInput from './TextInput'
import styled, { keyframes } from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0.5rem;
    border: solid 5px #f02e65;
    border-radius: 1rem;
    margin: 1rem;
`

const colorRotate = keyframes`
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
`

const RainbowButton = styled(Button)`
    animation: ${colorRotate} 15s infinite;
    background-color: hsl(0deg 90% 80% / 100%);
    border: solid 5px hsl(0deg 90% 80% / 100%);
`

export default function JoinRoomBox({ onSubmit }) {
    const [nameValue, setNameValue] = useState("")
    const [roomNameValue, setRoomNameValue] = useState("")

    const [nameErrMsg, setNameErrMsg] = useState("")
    const [roomNameErrMsg, setRoomNameErrMsg] = useState("")

    return <Container>
        <Heading as="h2">Join a Room</Heading>
        <TextInput name="name" label="Name" errMsg={nameErrMsg}
            onChange={({value}) => {
                setNameValue(value)
            }}
        ></TextInput>
        <TextInput name="roomname" label="Room Name" errMsg={roomNameErrMsg}
            onChange={({value}) => {
            setRoomNameValue(value)
            }}></TextInput>
        <RainbowButton onClick={() => {
            if (!nameValue) setNameErrMsg("Please enter your name.")
            else setNameErrMsg("")
            if (!roomNameValue) setRoomNameErrMsg("Please enter a room name.")
            else setRoomNameErrMsg("")

            if (nameValue && roomNameValue)
                onSubmit(nameValue, roomNameValue)
        }}>Start Chatting</RainbowButton>
    </Container>
}

