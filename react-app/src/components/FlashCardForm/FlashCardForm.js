
import { useState } from 'react'
import './FlashCardForm.css'

export default function FlashCardForm({cards,setCards}) {

    const [front,setFront] = useState()
    const [back,setBack] = useState()


    const addCard = (e) => {

        const newCard = {front: front, back: back}
        setCards([...cards,newCard])
        setFront('')
        setBack('')


    }





    return (
        <div className="flash-card-continer">

            <label>Front</label>
            <input value={front} onChange={(e) => setFront(e.target.value)} className='card-input' />

            <label>Back</label>
            <input value={back} onChange={(e) => setBack(e.target.value)}  className='card-input' />
            <div onClick={(e) => addCard(e)}>ADD CARD</div>
        </div>
    )
}
