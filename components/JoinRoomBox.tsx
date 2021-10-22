
import React, { useState } from 'react'
import Heading from './Heading'
import Button from './Button'
import TextInput from './TextInput'

export default function JoinRoomBox({ onSubmit }) {
    const [nameValue, setNameValue] = useState("")
    const [roomIdValue, setRoomIdValue] = useState("")

    const [nameErrMsg, setNameErrMsg] = useState("")
    const [roomIdErrMsg, setRoomIdErrMsg] = useState("")

    return <>
        <Heading as="h2">Join a Room</Heading>
        <TextInput name="name" label="Name" errMsg={nameErrMsg}
            onChange={({value}) => {
                setNameValue(value)
            }}
        ></TextInput>
        <TextInput name="roomid" label="Room ID" errMsg={roomIdErrMsg}
            onChange={({value}) => {
            setRoomIdValue(value)
            }}></TextInput>
        <Button text="Start Chatting" onClick={() => {
            if (!nameValue) setNameErrMsg("Please enter your name.")
            else setNameErrMsg("")
            if (!roomIdValue) setRoomIdErrMsg("Please enter a room ID.")
            else setRoomIdErrMsg("")

            if (nameValue && roomIdValue)
                onSubmit(nameValue, roomIdValue)
        }} />
    </>
}

