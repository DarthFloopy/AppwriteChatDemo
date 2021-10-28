
import React, { useState } from "react";
import { deleteRoom, getAllRoomNames } from "../dbapis";
import JoinRoomBox from "./JoinRoomBox";
import RoomGUI from "./RoomGUI"

export default function App() {

    const [roomName, setRoomName] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userJoinedRoom, setUserJoinedRoom] = useState(false)

    if (!userJoinedRoom) {
        return <JoinRoomBox onSubmit={ (name, roomName) => {
            setUserName(name)
            setRoomName(roomName)
            setUserJoinedRoom(true)

            getAllRoomNames().then(list => {
                console.log(list)
                if (!(list.includes(roomName))) {
                    console.log("room does not exist")
                }
            })
        }} />
    }
    else {
        return <RoomGUI roomName={roomName} userName={userName} />
    }

}

