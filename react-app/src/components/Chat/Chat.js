import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import './Chat.css'
import { sendMessage } from "../../store/Chat";


export default function Chat() {


    const [chatDisplay,setChatDisplay] = useState([{role: 'system', content: "Only speak in brazilian portuguese"}])
    const [chatInput,setChatInput] = useState('')
    const [disabled,setDisabled] = useState(false)
    const dispatch = useDispatch()




    const submitChat = async (e) => {

        let message = {role: 'user', content: chatInput}
        const updatedChatDisplay = [...chatDisplay,message]
        setChatDisplay(updatedChatDisplay)
        setChatInput('')

        setDisabled(true)
        dispatch(sendMessage(updatedChatDisplay)).then(msg => {
            setChatDisplay([...updatedChatDisplay,msg])
            setDisabled(false)
        })




    }



    return (


        <div className='chat-container'>


            <div className='chat-display'>

            {Object.values(chatDisplay).slice(1).map(msg => (
                <p className={msg.role}>{msg.content}</p>
            ))}



            </div>
            <div className="chat-input-container">

            <textarea className="chat-input" value={chatInput} onChange={(e) => setChatInput(e.target.value)} />
            <button disabled={disabled} onClick={() => submitChat()}>SEND</button>
            </div>


        </div>



    )



}