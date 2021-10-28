
import React from "react";
import { deleteRoom, getAllRoomNames } from "../dbapis";
import JoinRoomBox from "./JoinRoomBox";
import RoomGUI from "./RoomGUI"

export default function App() {

    return (
    <>
        <JoinRoomBox onSubmit={ (name, roomName) => {
            getAllRoomNames().then(list => {
                console.log(list)
                if (!(list.includes(roomName))) {
                    console.log("room does not exist")
                }
            })
        }} />
        <RoomGUI roomName="test3" userName="bill" />
    </>
    )

}

