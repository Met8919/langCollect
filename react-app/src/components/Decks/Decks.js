import './Decks.css'
import { useDispatch,useSelector } from "react-redux";
import { getUserDecks } from '../../store/deck';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Deck from './DeckTile';



export default function Decks() {

    const dispatch = useDispatch()
    const decks = useSelector(state => state.decks.decks)



    useEffect(() => {

        dispatch(getUserDecks(1))


    },[dispatch])



    if (!Object.values(decks).length) return null



    return (
        <div className='outter-container'>
            <h1>SELECT A DECK</h1>
        <div className='decks-container'>

            {Object.values(decks).map(deck => (
                <NavLink to='/'>
                    <Deck deck={deck} />

                </NavLink>
            ))}

        </div>

        <NavLink id='create-a-deck' to='/'>CREATE A DECK</NavLink>

        </div>
    )
}
