import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { getUserDecks } from "../../store/deck";

import './CardReview.css'

export default function CardReview() {

    const {deckId} = useParams()

    const decks = useSelector(state => state.decks.decks)
    const dispatch = useDispatch()

    const [cards,setCards] = useState([])
    const [cardNumber,setCardNumber] = useState(0)


    useEffect(() => {

        dispatch(getUserDecks(1))


    },[dispatch])


    useEffect(() => {

        if (Object.values(decks).length) {


            setCards(Object.values(decks[deckId].flashCards))

        }


    },[decks])




    const previousCard = () => {

        if (cardNumber === 0) return

        setCardNumber(cardNumber -1)

    }


    const nextCard = () => {

        if (cardNumber === cards.length -1) return

        setCardNumber(cardNumber +1)

    }



    if (!Object.values(cards).length) return null
    // const flashCards = decks[deckId].flashCards

    console.log(cards[cardNumber].front,'====')

    return (
            <div className="outter-review-container">


                                <div onClick={() => previousCard()} className="change-cards"> back </div>
                            <div className="review-container">

                                <div className="flash-card-front">{cards[cardNumber].front}</div>

                            </div>
                                <div onClick={() => nextCard()} className="change-cards"> next </div>


            </div>

    )



}
