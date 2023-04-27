

import { useEffect, useState } from 'react'
import { addWord } from '../../store/knownWords'
import './Popup.css'
import { getTranslation } from '../../store/Chat'
import { useDispatch } from "react-redux";


export default function PopUp({word,setMenuOpen}) {

    const [translated,setTranslated] = useState('')
    const dispatch = useDispatch()




    useEffect(() => {


        dispatch(getTranslation(word.id)).then(trans => {
            setTranslated(trans)
        })




    },[])


    if (!translated.length) return null





    return (
        <>
        <div className="popup-container">

            <p className='popup-word'>{word.id}</p>
            <p className='word-translated'>{translated}</p>


        </div>
            <div className="popup-button-container">

            <p className='popup-buttons' onClick={() => setMenuOpen(false)}>CLOSE </p>
            <p className='popup-buttons' onClick={() => addWord()}>ADD TO KNOWN WORDS</p>

            </div>

        </>

    )
}
