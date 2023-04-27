

import { addWord } from '../../store/knownWords'
import './Popup.css'



export default function PopUp({word,setMenuOpen}) {







    return (

        <div className="popup-container">

            <p className='popup-word'>{word.id}</p>
            <div className="popup-button-container">

            <p className='popup-buttons' onClick={() => setMenuOpen(false)}>CLOSE </p>
            <p className='popup-buttons' onClick={() => addWord()}>ADD TO KNOWN WORDS</p>

            </div>

        </div>

    )
}
