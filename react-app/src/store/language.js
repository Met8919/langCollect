const SET_LANGUAGES = 'language/SET_LANGUAGES'
const SET_USER_LANGUAGES = 'language/SET_USER_LANGUAGES'

const setLanguages = (languages) => {

    return {
        type: SET_LANGUAGES,
        languages
    }
}

const setUserLanguages = (userLanguages) => {

    return {
        type: SET_USER_LANGUAGES,
        userLanguages
    }

}


export const getUserLanguages = () => async (dispatch) => {

    const res = await fetch(`/api/languages/1`)

    if (res.ok) {
        const userLanguages = await res.json()
        dispatch(setUserLanguages(userLanguages))
    }

}






export const getLanguages = () => async (dispatch) => {

    const res = await fetch('/api/languages')

    if (res.ok) {

        const languages = await res.json()
        dispatch(setLanguages(languages))


    }
}



const initalState = {userLanguages: {}, languages: {}}

export default function languageReducer(state = initalState, action) {



    switch(action.type) {
        case SET_LANGUAGES:
            return {...state, languages: action.languages}
        case SET_USER_LANGUAGES:
            return {...state, userLanguages: action.userLanguages}

        default:
            return state
    }

}
