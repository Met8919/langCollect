
const SET_USER_DECKS = 'deck/SET_USER_DECKS'



const setUserDecks = (decks) => {

    return {
        type: SET_USER_DECKS,
        decks
    }

}


export const getUserDecks = (langId) => async (dispatch) => {

    const res = await fetch(`/api/decks/${langId}`)

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
