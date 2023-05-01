
import React, { useEffect, useState } from "react";
import './DeckForm.css'
import OpenModalButton from "../OpenModalButton";
import FlashCardForm from "../FlashCardForm/FlashCardForm";
import { createDeck } from "../../store/deck";
import { createFlashCards } from "../../store/flashCards";
import { useDispatch , useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function DeckForm({word = {},translated = {},setCreateDeck,setDecksDisplay,setCreateFlashActive}) {

    const [cards,setCards] = useState([])
    const [title,setTitle] = useState('')
    const [showMenu, setShowMenu] = useState(false);
    const [errors,setErrors] = useState({})
    const currentLanguage = useSelector(state => state.languages.currentLanguage)

    const dispatch = useDispatch()


    const closeMenu = () => setShowMenu(false);
    const history = useHistory()


    useEffect(() => {

       if (Object.values(word).length) {


        const front = word.id
        const back = translated

        const newCard = {front: front, back: back}
        setCards([newCard])

       }


    },[])





    const handleSubmit = (e) => {

        const err = {}



        if (title.length < 3 || title.length > 50) {
            err.title = 'Title must be betwen three and fifty characters'
        }

        if (!cards.length) {
            err.cards = 'Deck must have at least one card'
        }




        console.log(errors)

        setErrors(err)

        if (Object.values(err).length) return






        dispatch(createDeck({title: title, langId: currentLanguage.id})).then((deck) => {

            const  newCards = {cards: cards, id: deck.id}
            dispatch(createFlashCards(newCards)).then(() => {

                if (!Object.values(word).length) {
                    history.push('/decks')

                } else {
                    setCreateDeck(false)
                    setDecksDisplay(false)
                    setCreateFlashActive(false)
                }


            })

        })






    }



    if (!Object.values(currentLanguage).length) return (<h1 className='please-select'>PLEASE SELECT A LANGUAGE</h1>)

    return (
        <div className="main-container">
        <div className="form-container">

            <label className='form-label'>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className='form-input' />
            <OpenModalButton

              buttonText="ADD CARD"
              onItemClick={closeMenu}
              modalComponent={<FlashCardForm cards={cards} setCards={setCards} />}

            />




        </div>

        {cards.map(card => (
            <div className="flash-card-container">

                <p className="flash-card front">{card.front}</p>
                <p className="flash-card back">{card.back}</p>

            </div>
        ))}



            <div onClick={(e) => handleSubmit(e)} className="form-submit">SAVE</div>

            {errors && <p className="errors">{errors.title}</p>}
            {errors && <p className="errors">{errors.cards}</p>}



        </div>

    )
}
