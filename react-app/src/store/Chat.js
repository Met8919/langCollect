



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



export const sendMessage = (chat) => async () => {

    const res = await fetch('/api/chat',{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(chat)

    })

    if (res.ok) {

        const newMessage = await res.json()
        return newMessage

    }


}
