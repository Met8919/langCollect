
import { useState } from 'react'
import './FlashCardForm.css'
import { useModal } from "../../context/Modal";

export default function UpdateFlashCardForm({cards,setCards,card,newCards,setNewCards}) {

    const [front,setFront] = useState(card.front)
    const [back,setBack] = useState(card.back)
    const { closeModal } = useModal();


    const editCard = () => {



        if (!card.new) {

            const updatedCard = {...card,front: front,back:back}

            const cardList = cards.slice()

            for (let i = 0; i < cardList.length; i++)  {


                if (cardList[i].id === card.id) {
                    cardList[i] = updatedCard

                }

            }
            setCards(cardList)
            closeModal()

        } else {




            const updatedCard = {...card,front: front,back:back, new: true,id: newCards.length + 1000}

            const cardList = newCards.slice()

            for (let i = 0; i < cardList.length; i++)  {


                if (cardList[i].id === card.id) {
                    cardList[i] = updatedCard

                }

            }
            setNewCards(cardList)
            closeModal()




        }





    }





    return (
        <div className="flash-card-continer">

            <label>Front</label>
            <input value={front} onChange={(e) => setFront(e.target.value)} className='card-input' />

            <label>Back</label>
            <input value={back} onChange={(e) => setBack(e.target.value)}  className='card-input' />
            <div onClick={(e) => editCard(e)}>SUBMIT</div>
        </div>
    )
}
