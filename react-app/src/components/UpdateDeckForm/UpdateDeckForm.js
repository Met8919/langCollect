
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector  } from 'react-redux';
import './DeckForm.css'
import OpenModalButton from "../OpenModalButton";
import FlashCardForm from "../FlashCardForm/FlashCardForm";
import UpdateFlashCardForm from "../UpdateFlashCardForm/UpdateFlashCardForm";
import {  updateDeck } from "../../store/deck";
import { createFlashCards, deleteCards } from "../../store/flashCards";
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { updateCards } from "../../store/flashCards";


export default function UpdateDeckForm() {

    const [cards,setCards] = useState([])
    const [title,setTitle] = useState('')
    const [showMenu, setShowMenu] = useState(false);
    const {deckId} = useParams()

    const [newCards,setNewCards] = useState([])

    const [cardsToDelete,setCardsToDelete] = useState([])
    // const [cardsToEdit,setCardsTOEdit] = useState([])

    const decks = useSelector(state => state.decks.decks)

    //chnage to langId - need to edit route in app comp
    const editDeck = decks[deckId]

    useEffect(() => {

        setCards(Object.values(editDeck.flashCards))
        setTitle(editDeck.title)

    },[deckId])





    const dispatch = useDispatch()


    const closeMenu = () => setShowMenu(false);
    const history = useHistory()









    const handleSave = (e) => {

        editDeck.title = title
        console.log('click')

        dispatch(updateDeck(editDeck))

        dispatch(updateCards(cards))

        dispatch(deleteCards(cardsToDelete))

        dispatch(createFlashCards({id: editDeck.id ,cards: newCards})).then(
            history.push('/decks')
        )







    }

    const handleCardDelete = (e) => {



       const id = +e.target.id

       console.log(id,'start')




        if (!cards.find(card => card.id === id)) {
            console.log('in')

            const idx = newCards.findIndex(card => card.id === id)
            console.log('index',idx)

            const updatedCardsList = newCards.slice()
            updatedCardsList.splice(idx,1)

            console.log(updatedCardsList)


            setNewCards(updatedCardsList)
            return

        }



        console.log('out')

       setCardsToDelete([...cardsToDelete,id])

       const idx = cards.findIndex(card => card.id === id)



       console.log('index',idx)

       const updatedCardsList = cards.slice()
       updatedCardsList.splice(idx,1)

       console.log(updatedCardsList)


       setCards(updatedCardsList)


    }





    return (
        <div className="main-container">
        <div className="form-container">

            <label className='form-label'>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className='form-input' />
            <OpenModalButton

              buttonText="ADD CARD"
              onItemClick={closeMenu}
              modalComponent={<FlashCardForm newCards={newCards} setNewCards={setNewCards} cards={cards} setCards={setCards}/>}

            />




        </div>

        {cards.map(card => (
            <div className="update-card-container">
                <OpenModalButton

                    buttonText="EDIT"
                    onItemClick={closeMenu}
                    modalComponent={<UpdateFlashCardForm card={card} cards={cards} setCards={setCards} />}

                />
                <p onClick={(e) => handleCardDelete(e)} id={`${card.id}`}  className="update-card-buttons">DELETE</p>
                <p className="card">{card.front}   :   {card.back}</p>

            </div>


        ))}
        {newCards.map(card => (
            <div className="update-card-container">
                <OpenModalButton

                    buttonText="EDIT"
                    onItemClick={closeMenu}
                    modalComponent={<UpdateFlashCardForm card={card} newCards={newCards} setNewCards={setNewCards} />}

                />
                <p onClick={(e) => handleCardDelete(e)} id={`${card.id}`} className="update-card-buttons">DELETE</p>
                <p className="card">{card.front}   :   {card.back}</p>

            </div>


        ))}



            <div onClick={(e) => handleSave(e)} className="form-submit">SAVE</div>


        </div>

    )
}
