
const SET_KNOWN_WORDS = 'knowWords/SET_KNOWN_WORDS'

const ADD_WORD = 'knownwords/ADD_WORD'


const setKnownWords = (words) => {


    return {
        type: SET_KNOWN_WORDS,
        words
    }

}

export const addWord = (word) => {

    return {
        type: ADD_WORD,
        word
    }

}


export const getKnownWords = (langId) => async (dispatch) => {

    const res = await fetch(`/api/known-words/${langId}`)
    console.log('GETTING KNOWN WORDS')

    if (res.ok) {

        const words = await res.json()
        dispatch(setKnownWords(words))

    }


}

export const postWord = (word) => async (dispatch) => {



    const res = await fetch('/api/known-words',{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(word)
    })




}






const initalState = {knownWords: {}}

export default function wordsReducer(state = initalState,action) {


    switch(action.type) {
        case SET_KNOWN_WORDS:
            return {...state, knownWords: action.words}
        case ADD_WORD:
            const newState = {...state, knownWords: {...state.knownWords} }
            newState.knownWords[action.word.word] = action.word
            return newState
        default:
            return state
    }


}
