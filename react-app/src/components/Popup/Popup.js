

import { useEffect, useRef, useState } from 'react'
import { postWord, getKnownWords, addWord } from '../../store/knownWords'
import './Popup.css'
import { getTranslation } from '../../store/Chat'
import { useDispatch, useSelector } from "react-redux";
import { getUserDecks } from '../../store/deck';
import { createFlashCards } from '../../store/flashCards';
import Deck from '../Decks/DeckTile';
import DeckForm from '../DeckForm/DeckForm';
import { toggleDisplayChoices } from '../../store/language';


export default function PopUp({word,setMenuOpen,currentLanguage}) {

    const [translated,setTranslated] = useState('')
    const [errors,setErrors] = useState({})
    const dispatch = useDispatch()
    const [message,setMessage] = useState('')
    const [decksDisplay,setDecksDisplay] = useState(false)
    const [flashCardCreationDisplay,setFlashCardCreationDisplay] = useState(false)
    const decks = useSelector(state => state.decks.decks)
    const addWordBtn = useRef()

    const [addWordBtnActive,setAddWordBtnActive] = useState(true)
    const [createFlashActive,setCreateFlashActive] = useState(true)

    const [createDeck,setCreateDeck] = useState(false)
    const [displayExistingDecks,setDisplayExistingDecks] = useState(false)



    useEffect(() => {

        // dispatch(getUserLanguages(user.id))
        if (Object.values(currentLanguage)) {


            dispatch(getUserDecks())

        }

    },[currentLanguage])



    useEffect(() => {


        dispatch(getTranslation({word: word.id, language: currentLanguage.name})).then(trans => {
            setTranslated(trans)
        }).catch(err => {
            setErrors(err)
        })
    },[])


    const handleAddWord = (e) => {

        const newWord = {word: word.id.toLowerCase(), languageId: currentLanguage.id }

        dispatch(postWord(newWord)).then(() => {


            addWordBtn.current.disabled = true
            addWordBtn.current.classList.add('all-black')
            addWordBtn.current.classList.remove('popup-buttons')
            setAddWordBtnActive(false)


            dispatch(addWord(newWord))
            setMessage('Added')

            setTimeout(() => {

                setMessage('')

            },700)
        })



    }



    if (!translated.length) return null







    return (
        <div>

            {!decksDisplay && !flashCardCreationDisplay && <>

            <div className="popup-container">

                  <p className='popup-word'>{word.id}</p>
                 <p className='word-translated'>{translated}</p>


             </div>
            <div className="popup-button-container">

              <p className='popup-buttons' onClick={() => {

                setMenuOpen(false)
                dispatch(toggleDisplayChoices())

              }}>CLOSE </p>
              {addWordBtnActive && <button className='popup-buttons' id='add-words-btn' ref={addWordBtn} onClick={handleAddWord}>ADD TO KNOWN WORDS</button>}
              {createFlashActive && <p className='popup-buttons' onClick={() => setDecksDisplay(true)}>CREATE FLASH CARD</p>}

                {message.length && <p className='word-added-message'>{message}</p>}
            </div>
            </>}



            {decksDisplay &&
            <div>


            <div className="popup-container">



                <>


                {decksDisplay && !displayExistingDecks && !createDeck && Object.values(decks).length && Object.values(decks).filter(deck => deck.languageId === currentLanguage.id).length && <h3 id='select-deck-title' onClick={() => setDisplayExistingDecks(true)}>ADD TO EXISTING DECK</h3>}
                <div className='container-decks'>
                    {!displayExistingDecks && !createDeck &&  <h3 id='create-deck-btn' onClick={() => setCreateDeck(true) } >CREATE A DECK</h3>}

                    {createDeck && <DeckForm setCreateFlashActive={setCreateFlashActive} setDecksDisplay={setDecksDisplay} word={word} translated={translated} setCreateDeck={setCreateDeck} />}


                    <div className='deck-choice-container'>


                {displayExistingDecks && !createDeck && Object.values(decks).length && Object.values(decks)
                .filter(deck => deck.languageId === currentLanguage.id).map(deck => (

                    <p onClick={() => {


                        setMessage('ADDED')
                        setTimeout(() => {
                            setMessage('')
                            setCreateFlashActive(false)
                            setDecksDisplay(false)


                        },700)


                        dispatch(createFlashCards({id: deck.id ,cards: [{front: word.id, back: translated}]}))



                    }} className='deck-option' name={deck.languageId} id={deck.id}>{deck.title}</p>
                ))}

                    </div>

                </div>
                </>



            </div>

            <div className="popup-button-container">

              <p className='popup-buttons' onClick={() => {
                setMenuOpen(false)
                dispatch(toggleDisplayChoices())
                console.log('clicking!!!!!!!!!!!')
              }}>CLOSE </p>

              <p className='popup-buttons' onClick={() => setDecksDisplay(true)}>CREATE FLASH CARD</p>

                {message.length && <p className='word-added-message'>{message}</p>}
            </div>

            </div>

            }



        </div>

    )
}
