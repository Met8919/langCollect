
const SET_USER_DECKS = 'deck/SET_USER_DECKS'



const setUserDecks = (decks) => {

    return {
        type: SET_USER_DECKS,
        decks
    }

}




export const updateDeck = (deck) => async () => {

    const res = await fetch(`/api/decks/${deck.id}`,{
        method: 'PUT',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(deck)

    })



}


export const deleteDeck = (deckId) => async (dispatch) => {

    const res = await fetch(`/api/decks/${deckId}`,{
        method: 'DELETE'
    })

   return res
}



export const createDeck = (deckForm) => async (dispatch) => {

    const {langId} = deckForm

    console.log(deckForm,'================================')

    const res = await fetch(`/api/decks/${langId}`,{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(deckForm)
    })

    if (res.ok) {
        const newDeck = await res.json()
        return newDeck

    }


}



export const getUserDecks = () => async (dispatch) => {

    const res = await fetch(`/api/decks`)

    if (res.ok) {
        const decks = await res.json()
        dispatch(setUserDecks(decks))

    }

}






const initalState = {decks: {}}


export default function deckReducer(state = initalState, action) {



    switch(action.type) {
        case SET_USER_DECKS:
            return {...state, decks: action.decks}
        default:
            return state
    }

}
