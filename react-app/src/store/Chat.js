

const ADD_MESSAGE = 'chat/ADD_MESSAGE'
const CHANGE_CHAT_LANGUAGE = '/chat/CHANGE_CHAT_LANGUAGE'
const ADD_ALL_MESSAGES = '/chat/ADD_ALL_MESSAGE'



export const changeChatLanguage = (message) => {

    return {
        type: CHANGE_CHAT_LANGUAGE,
        message
    }

}



export const addMessage = (message) => {

    return {
        type: ADD_MESSAGE,
        message
    }
}


export const addMessages = (messages) => {

    return {
        type: ADD_ALL_MESSAGES,
        messages
    }

}





export const getTranslation = (word) => async () => {


    const res = await fetch('/api/translate',{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(word)
    })

    if (res.ok) {
        const translatedWord = res.json()
        return translatedWord
    }

}



export const sendMessage = (chat) => async (dispatch) => {

    const res = await fetch('/api/chat',{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(chat)

    })

    if (res.ok) {

        const newMessage = await res.json()

        dispatch(addMessage(newMessage))

    }


}


const initalState = {currentChat: []}

export default function chatReducer(state = initalState, action) {


    switch(action.type) {

        case ADD_MESSAGE:
            return {...state, currentChat: [...state.currentChat,action.message]}
        case CHANGE_CHAT_LANGUAGE:
            return {...state, currentChat: [action.message]}
        case ADD_ALL_MESSAGES:
            return {...state, currentChat: [...action.messages]}

        default:

       }   return state



}
