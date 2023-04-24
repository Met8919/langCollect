
import React, { useState } from "react";
import './DeckForm.css'
import OpenModalButton from "../OpenModalButton";
import FlashCardForm from "../FlashCardForm/FlashCardForm";
import { createDeck } from "../../store/deck";
import { createFlashCards } from "../../store/flashCards";
import { useDispatch , useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function DeckForm() {

    const [cards,setCards] = useState([])
    const [title,setTitle] = useState('')
    const [showMenu, setShowMenu] = useState(false);
    const [errors,setErrors] = useState({})
    const currentLanguage = useSelector(state => state.languages.currentLanguage)

    const dispatch = useDispatch()


    const closeMenu = () => setShowMenu(false);
    const history = useHistory()





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
                history.push('/decks')
            })

        })






    }





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
            <p className="card">{card.front}   :   {card.back}</p>
        ))}



            <div onClick={(e) => handleSubmit(e)} className="form-submit">SAVE</div>

            {errors && <p className="errors">{errors.title}</p>}
            {errors && <p className="errors">{errors.cards}</p>}



        </div>

    )
}
