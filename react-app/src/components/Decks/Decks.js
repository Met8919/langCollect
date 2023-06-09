import './Decks.css'
import { useDispatch,useSelector } from "react-redux";
import { deleteDeck, getUserDecks } from '../../store/deck';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Deck from './DeckTile';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getUserLanguages } from '../../store/language';



export default function Decks() {

    const dispatch = useDispatch()
    const decks = useSelector(state => state.decks.decks)
    const currentLanguage = useSelector(state => state.languages.currentLanguage)
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const userLanguages = useSelector(state => state.languages.userLanguages)


    const [currentDeck,setCurrentDeck] = useState(0)
    const [displayPopup,setDisplayPopup] = useState(false)



    useEffect(() => {

        dispatch(getUserLanguages(user.id))
        if (Object.values(currentLanguage)) {


            dispatch(getUserDecks())

        }





    },[currentLanguage])

    const handleDeleteClick = (deckId) => {
        setDisplayPopup(true)
        setCurrentDeck(deckId)
        
    }


    const handleDeleteDeck = () => {

        setDisplayPopup(false)
        dispatch(deleteDeck(currentDeck)).then(() => {
            dispatch(getUserDecks())
            setDisplayPopup(false)
        })
        
    }

    const closePopup = () => {

        setDisplayPopup(false)
       

    }


    const handleEditDeck = (deckId) => {
        history.push(`/decks/update/${deckId}`)
    }

    if (!Object.values(userLanguages).length) return (<h1 className='please-select'>PLEASE ADD A LANGUAGE TO PROFILE</h1>)
    if (!Object.values(currentLanguage).length) return (<h1 className='please-select'>PLEASE SELECT A LANGUAGE</h1>)





    return (
        <div className='outter-container'>
            {Object.values(decks).length && <h1>SELECT A DECK</h1>}
            {!Object.values(decks).length && <h1>CREATE YOUR FIRST DECK</h1>}
        <div className='decks-container'>

            {displayPopup && 
                <div className='confirm-delete'>
                    <p>Confirm deletion</p>
                    <p onClick={(e) => handleDeleteDeck()} className='btn-option'>Delete</p>
                    <p onClick={(e) => closePopup()} className='btn-option'>Close</p>
                </div>}

            {Object.values(decks).length && Object.values(decks).filter(deck => deck.languageId === currentLanguage.id).map(deck => (
                <div className='card-container'>
                <NavLink hoverStyle={{ color: "blueviolet" }} className='navLink' to={`/decks/${deck.id}`}>
                    <Deck deck={deck} />


                </NavLink>
                <div className='deck-buttons-container'>
                    <p onClick={() => handleEditDeck(deck.id)} className='deck-buttons'>EDIT</p>
                    <p onClick={() => handleDeleteClick(deck.id)} className='deck-buttons'>DELETE</p>

                </div>

                </div>
            ))}

        </div>

        <NavLink id='create-a-deck' to='/decks/new'>CREATE A DECK</NavLink>

        </div>
    )
}
