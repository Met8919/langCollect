
import './Decks.css'

export default function Deck({deck}) {

    console.log(deck,'==================')

    return (
        <div className='deck-tile'>

            <p>{deck.title}</p>
            <p>No. cards {Object.values(deck.flashCards).length}</p>
        </div>
    )

}
