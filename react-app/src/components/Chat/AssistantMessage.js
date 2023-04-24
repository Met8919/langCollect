




export default function AssistantMessage({content,knownWords}) {


    const messageElements = content.split(' ').map(word => {

        const wordToLower = word.toLowerCase()

        if (!knownWords[wordToLower]) {
            return <span className="unknown-word" id={word} >{word} </span>
        }   else {
            return <span>{word} </span>
        }


    })

    if (!messageElements.length) return null


    return (

        <>


            {messageElements}



        </>


    )





}
