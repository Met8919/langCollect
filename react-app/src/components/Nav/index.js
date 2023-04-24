import './Nav.css'
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getLanguages, getUserLanguages, setCurrentLanguage } from "../../store/language";

export default function Nav() {
    const dispatch = useDispatch()
    const languages = useSelector(state => state.languages.languages)
    const userLanguages = useSelector(state => state.languages.userLanguages)
    const currentLanguage = useSelector(state => state.languages.currentLanguage)

    useEffect(() => {
        dispatch(getLanguages())
        dispatch(getUserLanguages())

    },[dispatch])


    const handleCurrentLanguage = (e) => {

        const languageName = e.target.innerText
        const lang = languages[languageName]
        console.log(lang)

        dispatch(setCurrentLanguage(lang))





    }




    if (!Object.values(languages).length) return null





    return (


        <>


        <div className="navbar-container">

            <NavLink className='nav-option' to='/'> Profile</NavLink>
            <NavLink className='nav-option' to='/'> Chat</NavLink>
            <NavLink className='nav-option' excat to='/decks'> Decks</NavLink>
            <p className='nav-option'>Current Language</p>

        </div>
        <div className='user-languages-container'>

            {Object.values(userLanguages).map(lang => (
                <p onClick={(e) => handleCurrentLanguage(e)} className={`user-languages ${currentLanguage?.name === lang.name ? 'active-language' : ''}` } >{lang.name}</p>
            ))}


        </div>
        </>




    )

}
