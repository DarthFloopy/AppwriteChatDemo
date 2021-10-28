
import React, { useState } from "react";
import { deleteRoom, getAllRoomNames } from "../dbapis";
import Dialog from "./Dialog";
import JoinRoomBox from "./JoinRoomBox";
import RoomGUI from "./RoomGUI"

export default function App() {

    const [roomName, setRoomName] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userJoinedRoom, setUserJoinedRoom] = useState(false)
    const [dialogVisible, setDialogVisible] = useState(false)

    if (!userJoinedRoom) {
        return <div style={{"position":"relative"}}>
            <JoinRoomBox onSubmit={ (name, roomName) => {
                setUserName(name)
                setRoomName(roomName)

                getAllRoomNames().then(list => {
                    if (list.includes(roomName)) {
                        setUserJoinedRoom(true)
                    } else {
                        setDialogVisible(true)
                    }
                })
            }} />
            {
                dialogVisible &&
                    <Dialog
                        text={`The room "${roomName}" does not exist. Create it?`}
                        buttonLabels={["Yes", "No"]}
                        onClick={response => {
                            setDialogVisible(false)
                            if (response == "Yes") {
                                setUserJoinedRoom(true)
                            }
                        }}
                        />
            }
        </div>
    }
    else {
        return <RoomGUI
            roomName={roomName}
            userName={userName}
            onExit={() => {
                setUserJoinedRoom(false)
            }}
            />
    }

}

