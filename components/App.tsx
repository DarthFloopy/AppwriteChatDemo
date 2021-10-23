
import React from "react";
import { getRoomsDirectory, createNewRoom, deleteRoom } from "../dbapis";
import JoinRoomBox from "./JoinRoomBox";

export default function App() {

    return (
    <>
        <JoinRoomBox onSubmit={ (name, roomName) => {
            getRoomsDirectory().then(dir => {
                if (dir.hasOwnProperty(roomName)) {
                    console.log("room already exists")
                } else {
                    createNewRoom(roomName).then(console.log)
                }
            })
        }} />
    </>
    )

}

