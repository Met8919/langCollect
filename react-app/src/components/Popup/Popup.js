

import { useEffect, useState } from 'react'
import { postWord, getKnownWords, addWord } from '../../store/knownWords'
import './Popup.css'
import { getTranslation } from '../../store/Chat'
import { useDispatch } from "react-redux";


export default function PopUp({word,setMenuOpen,currentLanguage}) {

    const [translated,setTranslated] = useState('')
    const [errors,setErrors] = useState({})
    const dispatch = useDispatch()




    useEffect(() => {


        dispatch(getTranslation({word: word.id, language: currentLanguage.name})).then(trans => {
            setTranslated(trans)
        }).catch(err => {
            setErrors(err)
        })
    },[])


    const handleAddWord = () => {

        const newWord = {word: word.id.toLowerCase(), languageId: currentLanguage.id }

        dispatch(postWord(newWord)).then(() => {
            dispatch(addWord(newWord))
        })



    }



    if (!translated.length) return null





    return (
        <>
        <div className="popup-container">

            <p className='popup-word'>{word.id}</p>
            <p className='word-translated'>{translated}</p>


        </div>
            <div className="popup-button-container">

            <p className='popup-buttons' onClick={() => setMenuOpen(false)}>CLOSE </p>
            <p className='popup-buttons' onClick={() => handleAddWord()}>ADD TO KNOWN WORDS</p>

            </div>

        </>

    )
}
