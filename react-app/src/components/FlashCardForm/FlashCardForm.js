
import { useState } from 'react'
import './FlashCardForm.css'
import { useModal } from "../../context/Modal";

export default function FlashCardForm({newCards,setNewCards,cards,setCards}) {

    const [front,setFront] = useState('')
    const [back,setBack] = useState('')
    const [errors,setErrors] = useState({})
    const { closeModal } = useModal();


    const addCard = (e) => {

        const err = {}


        if (front.length < 1 || front.length > 230) {
            err.front = 'Front text must be between 1 and 230 characters'
        }

        if (back.length < 1 || back.length > 230) {
            err.back = 'Back text must be between 1 and 230 characters'

        }

        setErrors(err)
        if (Object.values(err).length) return

        if (!newCards) {
            const newCard = {front: front, back: back}
            setCards([...cards,newCard])
            setFront('')
            setBack('')
            closeModal()




        } else {
            const newCard = {front: front, back: back, id: newCards.length + 1000, new: true}
            setNewCards([...newCards,newCard])
            setFront('')
            setBack('')
            closeModal()

        }




    }





    return (
        <div className="flash-card-continer">

            <label>Front</label>
            <input value={front} onChange={(e) => setFront(e.target.value)} className='card-input' />

            <label>Back</label>
            <input value={back} onChange={(e) => setBack(e.target.value)}  className='card-input' />
            <div onClick={(e) => addCard(e)}>ADD CARD</div>
            {errors.front && <p className='errors'>{errors.front}</p>}
            {errors.back && <p className='errors'>{errors.back}</p>}
        </div>
    )
}
