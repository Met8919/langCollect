
import './Decks.css'

export default function Deck({deck}) {

    console.log(deck,'==================')

    return (
        <div className='deck-tile'>

            <p>{deck.title}</p>
            <p>{Object.values(deck.flashCards).length} {Object.values(deck.flashCards).length > 1 ? 'cards' : 'card'}</p>
        </div>
    )

}
