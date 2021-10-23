
import React from "react";
import { getRoomsDirectory, createNewRoom, deleteRoom } from "../dbapis";
import JoinRoomBox from "./JoinRoomBox";

export default function App() {

    return <JoinRoomBox onSubmit={ (name, roomID) => {
        createNewRoom(roomID).then(console.log)
    }}></JoinRoomBox>


}

