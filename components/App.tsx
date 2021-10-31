
import React, { useState } from "react";
import { countMessagesInRoom } from "../dbapis";
import Dialog from "./Dialog";
import JoinRoomBox from "./JoinRoomBox";
import RoomGUI from "./RoomGUI"
import badge_url from '../built-with-appwrite.svg'
import styled from "styled-components";
import { apiEndpoint } from "../config"


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
    const [createRoomDialogVisible, setCreateRoomDialogVisible] = useState(false)
    const [corsErrorDialogVisible, setCorsErrorDialogVisible] = useState(false)

    if (!userJoinedRoom) {
        return <Container>
            <TitleHeading>chatwrite</TitleHeading>
            <a href="https://appwrite.io" target="_blank">
                <img src={badge_url} alt="Built with Appwrite"
                    style={{"height":"1.5rem"}} />
            </a>
            <JoinRoomBox onSubmit={ (name, roomName) => {
                setUserName(name)
                setRoomName(roomName)

                countMessagesInRoom(roomName).then(number => {
                    if (number > 0)
                        setUserJoinedRoom(true)
                    else
                        setCreateRoomDialogVisible(true)
                }).catch(err => {
                    setCorsErrorDialogVisible(true)
                })
            }} />
            {
                createRoomDialogVisible &&
                    <Dialog
                        text={`The room "${roomName}" does not exist. Create it?`}
                        buttonLabels={["Yes", "No"]}
                        onClick={response => {
                            setCreateRoomDialogVisible(false)
                            if (response == "Yes") {
                                setUserJoinedRoom(true)
                            }
                        }}
                        />
            }
            {
                corsErrorDialogVisible &&
                    <Dialog
                        text={"CORS error -- try viewing " +
                            `this page on ${apiEndpoint.split(":").slice(0,2).join(":")}:80`}
                        buttonLabels={["OK"]}
                        onClick={() => {
                            setCorsErrorDialogVisible(false)
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

