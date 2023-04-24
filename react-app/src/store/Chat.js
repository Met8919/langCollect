



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