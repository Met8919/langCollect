




export default function AssistantMessage({content,knownWords,popUp}) {




    const messageElements = content.split(' ').map(word => {


        const extraChars = [',','.','!','?']

        let sanitizedWord = word

        for (let char of extraChars) {

            if (word.endsWith(char)) {

                sanitizedWord = word.slice(0,word.length -1)
            }

        }
        sanitizedWord = sanitizedWord.toLowerCase()


        if (!knownWords[sanitizedWord]) {
            return <span onClick={(e) => popUp(e)} className="unknown-word" id={sanitizedWord} >{word} </span>
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
