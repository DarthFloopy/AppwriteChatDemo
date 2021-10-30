
import React, { useState } from "react";
import { countMessagesInRoom } from "../dbapis";
import Dialog from "./Dialog";
import JoinRoomBox from "./JoinRoomBox";
import RoomGUI from "./RoomGUI"
import badge_url from '../built-with-appwrite.svg'
import styled from "styled-components";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    text-align: center;
`

const TitleHeading = styled.h1`
    font-family: Impact;
    border: solid 5px lightblue;
    border-radius: 1rem;
    padding: 0.3rem 1.5rem;
    margin: 1rem;
`


export default function App() {

    const [roomName, setRoomName] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userJoinedRoom, setUserJoinedRoom] = useState(false)
    const [dialogVisible, setDialogVisible] = useState(false)

    if (!userJoinedRoom) {
        return <Container>
            <TitleHeading>chatwrite</TitleHeading>
            <img src={badge_url} alt="Built with Appwrite"
                style={{"height":"1.5rem"}} />
            <JoinRoomBox onSubmit={ (name, roomName) => {
                setUserName(name)
                setRoomName(roomName)

                countMessagesInRoom(roomName).then(number => {
                    if (number > 0)
                        setUserJoinedRoom(true)
                    else
                        setDialogVisible(true)
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
        </Container>
    }
    else {
        return <div style={{"width":"100vw","height":"100vh"}}>
            <RoomGUI
                roomName={roomName}
                userName={userName}
                onExit={() => {
                    setUserJoinedRoom(false)
                }}
                />
        </div>
    }

}

