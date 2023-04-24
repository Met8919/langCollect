import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Chat.css'
import { sendMessage } from "../../store/Chat";
import AssistantMessage from "./AssistantMessage";
import { getKnownWords } from "../../store/knownWords";
import { getUserLanguages } from "../../store/language";



export default function Chat() {


    const [chatDisplay,setChatDisplay] = useState([])
    const [chatInput,setChatInput] = useState('')
    const [disabled,setDisabled] = useState(false)
    const dispatch = useDispatch()

    const knownWords = useSelector(state => state.words.knownWords)
    const currentLanguage = useSelector(state => state.languages.currentLanguage)
    const user = useSelector(state => state.session.user)


    useEffect(() => {


        dispatch(getKnownWords(currentLanguage.id))
        dispatch(getUserLanguages(user.id))

    },[dispatch])

    useEffect(() => {

        if (Object.values(currentLanguage).length) {
            const system = [...chatDisplay]
            system[0] = {role: 'system', content: `Only speak in ${currentLanguage.name}`}
            setChatDisplay(system)
        }


    },[currentLanguage])




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

    if (!Object.values(currentLanguage).length) return (<h1 className='please-select'>PLEASE SELECT A LANGUAGE</h1>)

    return (


        <div className='chat-container'>


            <div className='chat-display'>

            {Object.values(chatDisplay).slice(1).map(msg => {


                if (msg.role === 'assistant') {

                    return <AssistantMessage content={msg.content} knownWords={knownWords} />
                }   else {
                    return <p className={msg.role}>{msg.content}</p>
                }

            })}



            </div>
            <div className="chat-input-container">

            <textarea className="chat-input" value={chatInput} onChange={(e) => setChatInput(e.target.value)} />
            <button disabled={disabled} onClick={() => submitChat()}>SEND</button>
            </div>


        </div>



    )



}
