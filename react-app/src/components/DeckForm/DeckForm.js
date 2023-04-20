
import React, { useState } from "react";
import './DeckForm.css'
import OpenModalButton from "../OpenModalButton";
import FlashCardForm from "../FlashCardForm/FlashCardForm";
import { createDeck, createFlashCards } from "../../store/deck";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function DeckForm() {

    const [cards,setCards] = useState([])
    const [title,setTitle] = useState('')
    const [showMenu, setShowMenu] = useState(false);

    const dispatch = useDispatch()


    const closeMenu = () => setShowMenu(false);
    const history = useHistory()



    const handleSubmit = (e) => {


        dispatch(createDeck({title: title, langId: 1})).then((deck) => {

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


        </div>

    )
}
