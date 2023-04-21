import './Decks.css'
import { useDispatch,useSelector } from "react-redux";
import { deleteDeck, getUserDecks } from '../../store/deck';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Deck from './DeckTile';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



export default function Decks() {

    const dispatch = useDispatch()
    const decks = useSelector(state => state.decks.decks)
    const history = useHistory()



    useEffect(() => {

        dispatch(getUserDecks(1))


    },[dispatch])

    const handleDeleteDeck = (deckId) => {


        dispatch(deleteDeck(deckId)).then(
            dispatch(getUserDecks(1))
        )

    }

    const handleEditDeck = (deckId) => {
        history.push(`/decks/update/${deckId}`)
    }



    if (!Object.values(decks).length) return null



    return (
        <div className='outter-container'>
            <h1>SELECT A DECK</h1>
        <div className='decks-container'>

            {Object.values(decks).map(deck => (
                <div className='card-container'>
                <NavLink to='/'>
                    <Deck deck={deck} />

                </NavLink>
                <div className='deck-buttons-container'>
                    <p onClick={() => handleEditDeck(deck.id)} className='deck-buttons'>EDIT</p>
                    <p onClick={() => handleDeleteDeck(deck.id)} className='deck-buttons'>DELETE</p>

                </div>

                </div>
            ))}

        </div>

        <NavLink id='create-a-deck' to='/decks/new'>CREATE A DECK</NavLink>

        </div>
    )
}
