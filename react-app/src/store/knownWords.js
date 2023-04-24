
const SET_KNOWN_WORDS = 'knowWords/SET_KNOWN_WORDS'




const setKnownWords = (words) => {


    return {
        type: SET_KNOWN_WORDS,
        words
    }


}


export const getKnownWords = (langId) => async (dispatch) => {

    const res = await fetch(`/api/known-words/${langId}`)


    if (res.ok) {

        const words = await res.json()
        dispatch(setKnownWords(words))

    }


}






const initalState = {knownWords: {}}

export default function wordsReducer(state = initalState,action) {


    switch(action.type) {
        case SET_KNOWN_WORDS:
            return {...state, knownWords: action.words}
        default:
            return state
    }


}
