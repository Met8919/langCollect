import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Chat.css'
import { addMessage, addMessages, changeChatLanguage, sendMessage } from "../../store/Chat";
import AssistantMessage from "./AssistantMessage";
import { getKnownWords } from "../../store/knownWords";
import { getUserLanguages, setWord2, toggleDisplayChoices } from "../../store/language";
import PopUp from "../Popup/Popup";
import OpenModalButton from "../OpenModalButton";



export default function Chat() {



    const [chatInput,setChatInput] = useState('')

    const [disabled,setDisabled] = useState(false)
    const dispatch = useDispatch()

    const knownWords = useSelector(state => state.words.knownWords)
    const currentLanguage = useSelector(state => state.languages.currentLanguage)
    const user = useSelector(state => state.session.user)
    const userLanguages = useSelector(state => state.languages.userLanguages)

    const chat = useSelector(state => state.chat.currentChat)

    const [menuOpen,setMenuOpen] = useState(false)
    const [word,setWord] = useState('This')

    const wordsa = useSelector(state => state.languages.word)


    const [showMenu, setShowMenu] = useState(false);
    const closeMenu = () => setShowMenu(false);

    const [display , setDisplay] = useState(false)

    const [errors,setErrors] = useState({})

    const [displayMessage,setDisplayMessage] = useState(true)



    const popUp = (e) => {

        const word = e.target


        dispatch(setWord2(word.id))
        setWord(word)
        setMenuOpen(true)
        dispatch(toggleDisplayChoices())





    }

    useEffect(() => {


        if (Object.values(currentLanguage).length) {


        dispatch(getKnownWords(currentLanguage.id))
        dispatch(getUserLanguages(user.id)).then(() => {
                setDisplay(true)
        })
        }

    },[currentLanguage])

    useEffect(() => {

        if (Object.values(currentLanguage).length) {
            const messages = [...chat]
            messages[0] = {role: 'system', content: `Only speak in ${currentLanguage.name}`}
            dispatch(changeChatLanguage(messages[0]))

        }


    },[currentLanguage])






    const submitChat = async (e) => {

        let message = {role: 'user', content: chatInput}
        const updatedChatDisplay = [...chat,message]


          setChatInput('')



            setDisabled(true)

            dispatch(addMessages(updatedChatDisplay))

            dispatch(sendMessage(updatedChatDisplay)).then(() => {
                setDisabled(false)
            }).catch((err) => {
                setErrors(err)
                setDisabled(false)
            })




    }






    if (errors.message) return <h1>{errors.message}</h1>

    if (!Object.values(userLanguages).length) return (<h1 className='please-select'>PLEASE ADD A LANGUAGE TO PROFILE</h1>)
    if (!Object.values(currentLanguage).length) return (<h1 className='please-select'>PLEASE SELECT A LANGUAGE</h1>)

    if (!display) return null


    return (

        <div className="outter-chat-container">

            {displayMessage && 
            <div className="info-message">
                <div className="close-info" onClick={(e) => setDisplayMessage(false)}>X</div>
                <p>Type your message in the box below 
                    to begin chatting in the foreign language of your choice.</p>
                    <p>Unknown words will appear highlighted. Click on the highlighted words to see the translation and or add them to a Deck as a flash card.</p>
                    
                </div>}

            {!menuOpen && <div className='chat-container'>


                <div className='chat-display'>

                {chat.length && chat.slice(1).map(msg => {


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




            </div>}

                {menuOpen && <PopUp word={word} setMenuOpen={setMenuOpen} currentLanguage={currentLanguage} /> }

        </div>


    )
}
