
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import Button from "./Button"

const DialogDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    background: white;
    border-radius: 8px;
    border: solid 5px #f02e65;
    max-width: 90vw;
    min-width: 50%;
    text-align: center;
    word-wrap: break-word;
`

export default function Dialog({ text, buttonLabels, onClick }) {
    return <DialogDiv>
        {text}
        <br />
        {buttonLabels.map(
            (label, index) =>
                <Button
                    key={index}
                    onClick={() => { onClick(label) }}
                    >{label}</Button>
        )}
    </DialogDiv>

}

