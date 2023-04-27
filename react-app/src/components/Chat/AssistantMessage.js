




export default function AssistantMessage({content,knownWords,popUp}) {




    const messageElements = content.split(' ').map(word => {

        const wordToLower = word.toLowerCase()

        if (!knownWords[wordToLower]) {
            return <span onClick={(e) => popUp(e)} className="unknown-word" id={word} >{word} </span>
        }   else {
            return <span id={word}>{word} </span>
        }


    })

    if (!messageElements.length) return null


    return (

        <>


            {messageElements}



        </>


    )





}
