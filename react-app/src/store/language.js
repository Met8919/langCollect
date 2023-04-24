const SET_LANGUAGES = 'language/SET_LANGUAGES'
const SET_USER_LANGUAGES = 'language/SET_USER_LANGUAGES'

const ADD_USER_LANGUAGE = 'language/ADD_USER_LANGUAGE'
const REMOVE_USER_LANGUAGE = 'language/REMOVE_USER_LANGUAGE'

const SET_CURRENT_LANGUAGE = 'language/SET_CURRENT_LANGUAGE'


export const setCurrentLanguage = (lang) => {

    return {
        type: SET_CURRENT_LANGUAGE,
        lang
    }

}

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


export const addUserLanguage = (lang) => {

    return {
        type: ADD_USER_LANGUAGE,
        lang
    }
}

export const removeUserLanguage = (lang) => {

    return {
        type: REMOVE_USER_LANGUAGE,
        lang
    }
}


export const getUserLanguages = () => async (dispatch) => {

    const res = await fetch(`/api/languages/1`)

    if (res.ok) {
        const userLanguages = await res.json()
        dispatch(setUserLanguages(userLanguages))
    }

}


export const deleteUserLanguage = (langId) => async () => {

    const res = await fetch(`/api/languages/${langId}`,{
        method: 'DELETE'
    })

}

export const createUserLanguage = (lang) => async() => {

    const res = await fetch('/api/languages',{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(lang)
    })

}






export const getLanguages = () => async (dispatch) => {

    const res = await fetch('/api/languages')

    if (res.ok) {

        const languages = await res.json()
        dispatch(setLanguages(languages))


    }
}






const initalState = {userLanguages: {}, languages: {}, currentLanguage: {}}

export default function languageReducer(state = initalState, action) {


    let newState

    switch(action.type) {
        case SET_LANGUAGES:
            return {...state, languages: action.languages}
        case SET_USER_LANGUAGES:
            return {...state, userLanguages: action.userLanguages}

        case ADD_USER_LANGUAGE:

            newState = {...state,userLanguages: {...state.userLanguages} }
            newState.userLanguages[action.lang.name] = action.lang

            return newState

        case REMOVE_USER_LANGUAGE:

            newState = {...state,userLanguages: {...state.userLanguages} }
            delete newState.userLanguages[action.lang.name]
            return newState
        case SET_CURRENT_LANGUAGE:

        newState = {...state,currentLanguage: action.lang}
        return newState

        default:
            return state
    }

}
