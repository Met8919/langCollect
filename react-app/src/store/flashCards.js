


export const createFlashCards = (cards) => async (dispatch) => {

    console.log(cards,'CARDS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    const res = await fetch('/api/cards', {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(cards)
    })

}



export const updateCards = (cards) => async() => {


    const res = await fetch('/api/cards',{
        method: 'PUT',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(cards)

    })

}


export const deleteCards = (cards) => async () => {


    for (let card of cards) {
        console.log(card,'-------')

        const res = await fetch(`/api/cards/${card}`,{
            method: 'DELETE',

        })



    }



}
