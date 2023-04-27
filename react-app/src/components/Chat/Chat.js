import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Chat.css'
import { sendMessage } from "../../store/Chat";
import AssistantMessage from "./AssistantMessage";
import { getKnownWords } from "../../store/knownWords";
import { getUserLanguages } from "../../store/language";
import PopUp from "../Popup/Popup";
import OpenModalButton from "../OpenModalButton";



export default function Chat() {


    const [chatDisplay,setChatDisplay] = useState([])
    const [chatInput,setChatInput] = useState('')
    const [disabled,setDisabled] = useState(false)
    const dispatch = useDispatch()

    const knownWords = useSelector(state => state.words.knownWords)
    const currentLanguage = useSelector(state => state.languages.currentLanguage)
    const user = useSelector(state => state.session.user)
    const userLanguages = useSelector(state => state.languages.userLanguages)

    const [menuOpen,setMenuOpen] = useState(false)
    const [word,setWord] = useState('This')


    const [showMenu, setShowMenu] = useState(false);
    const closeMenu = () => setShowMenu(false);





    const popUp = (e) => {

        const word = e.target

        setWord(word)
        setMenuOpen(true)

        // if (word.classList.contains('unknown-word')) {
        //     word.classList.remove('unknown-word')
        // }   else {
        //     word.classList.add('unknown-word')

        // }




    }

    useEffect(() => {


        dispatch(getKnownWords(currentLanguage.id))
        dispatch(getUserLanguages(user.id))
        alert('Unkown words will appear highlighted. Click on the highlighted word to view its meaning ')

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


    if (!Object.values(userLanguages).length) return (<h1 className='please-select'>PLEASE ADD A LANGUAGE TO PROFILE</h1>)
    if (!Object.values(currentLanguage).length) return (<h1 className='please-select'>PLEASE SELECT A LANGUAGE</h1>)

    return (

        <div className="outter-chat-container">

            <div className='chat-container'>


                <div className='chat-display'>

                {Object.values(chatDisplay).slice(1).map(msg => {


                    if (msg.role === 'assistant') {

                        return <AssistantMessage content={msg.content} knownWords={knownWords} popUp={popUp} />
                    }   else {
                        return <p className={msg.role}>{msg.content}</p>
                    }

                })}



                </div>
                <div className="chat-input-container">

                <textarea className="chat-input" onKeyDown={(e) => e.key === 'Enter' ? submitChat() : ''}  value={chatInput} onChange={(e) => setChatInput(e.target.value)} />
                <button className="chat-send-button" disabled={disabled} onClick={() => submitChat()}>SEND</button>
                </div>




            </div>

                {menuOpen && <div className="word-popup">

                        <PopUp word={word} setMenuOpen={setMenuOpen} />

                    </div>}

        </div>


    )



}
