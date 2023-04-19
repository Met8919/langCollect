import './Nav.css'
import { NavLink } from 'react-router-dom';

export default function Nav() {



    return (

        // <h1>test</h1>


        <div className="navbar-container">

            <NavLink className='nav-option' to='/'> Profile</NavLink>
            <NavLink className='nav-option' to='/'> Chat</NavLink>
            <NavLink className='nav-option' excat to='/decks'> Decks</NavLink>
            <p className='nav-option'>Current Language</p>

        </div>



    )

}
