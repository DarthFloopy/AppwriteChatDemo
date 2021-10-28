
import React, { useRef, useState } from 'react'
import Heading from './Heading'
import Button from './Button'
import TextInput from './TextInput'

export default function JoinRoomBox(
    { onSubmit, initialNameValue="", initialRoomNameValue="" }
) {
    const [nameValue, setNameValue] = useState(initialNameValue)
    const [roomNameValue, setRoomNameValue] = useState(initialRoomNameValue)

    const [nameErrMsg, setNameErrMsg] = useState("")
    const [roomNameErrMsg, setRoomNameErrMsg] = useState("")

    // const nameBox = useRef(null)
    // const roomNameBox = useRef(null)

    return <>
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
        <Button onClick={() => {
            if (!nameValue) setNameErrMsg("Please enter your name.")
            else setNameErrMsg("")
            if (!roomNameValue) setRoomNameErrMsg("Please enter a room name.")
            else setRoomNameErrMsg("")

            if (nameValue && roomNameValue)
                onSubmit(nameValue, roomNameValue)
        }}>Start Chatting</Button>
    </>
}

