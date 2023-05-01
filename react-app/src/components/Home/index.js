import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addUserLanguage, clearCurrentLanguage, createUserLanguage, deleteUserLanguage, getLanguages, getUserLanguages, removeUserLanguage, setStartingLanguages } from "../../store/language";

import './Home.css'
import WorldMap from "../WorldMap/WorldMap";





export default function Home() {








    const dispatch = useDispatch()
    const languages = useSelector(state => state.languages.languages)
    const userLanguages = useSelector(state => state.languages.userLanguages)
    const currentLanguage = useSelector(state => state.languages.currentLanguage)
    const user = useSelector(state => state.session.user)

    const [message,setMessage] = useState('')


    const startingLanguages = useSelector(state => state.languages.startingLanguages)
    const image = require('./world.svg.png')

    const saveChanges = useRef()



    /// CREATE SAVE BUTTON ANIMATION!!!!!!!!!!
    //!!!!!!!!!!!!!!!
    //!!!!!!!!!!

    useEffect(() => {

        const userLangs = Object.values(userLanguages)
       const startingLangs = Object.values(startingLanguages)

       const languagesToAdd = []
       const languagesToDelete = []

       console.log('clicked')

       for (let lang of userLangs) {

            if (!startingLanguages[lang.name]) {
                languagesToAdd.push(lang)
            }
       }

       for (let lang of startingLangs) {

            if (!userLanguages[lang.name]) {
                languagesToDelete.push(lang)
            }
       }



    },[userLanguages])





    const handleSave = (e) => {

       const userLangs = Object.values(userLanguages)
       const startingLangs = Object.values(startingLanguages)

       const languagesToAdd = []
       const languagesToDelete = []

       console.log('clicked')

       console.log(startingLanguages,'-----------base')
       console.log(userLanguages,'----------change')



       for (let lang of userLangs) {

            if (!startingLanguages[lang.name]) {
                languagesToAdd.push(lang)
            }

       }

       for (let lang of startingLangs) {

            if (!userLanguages[lang.name]) {
                languagesToDelete.push(lang)
            }



       }


       console.log(languagesToAdd,'to add ++++++')
       console.log(languagesToDelete,'to delete ---------')


       if (languagesToAdd.length) {

            for (let lang of languagesToAdd) {
                dispatch(createUserLanguage(lang))
            }
       }

       if (languagesToDelete.length) {

            for (let lang of languagesToDelete) {
                dispatch(deleteUserLanguage(lang.id))
            }

       }

       dispatch(setStartingLanguages(userLanguages))


       setMessage('Saved')
       setTimeout(() => {

        setMessage('')

    },700)


    }


    const handleCountryClick = (e) => {

        const countryDiv = e.currentTarget
        const currentCountry = languages[countryDiv.id]

        console.log(countryDiv,'-----',currentCountry)

        if (!countryDiv.classList.contains(`selected-${countryDiv.id}`)) {

            countryDiv.classList.add(`selected-${countryDiv.id}`)
            dispatch(addUserLanguage(currentCountry))

        }   else {

            countryDiv.classList.remove(`selected-${countryDiv.id}`)
            dispatch(removeUserLanguage(currentCountry))

            if (currentCountry.name === currentLanguage.name) {
                dispatch(clearCurrentLanguage())
            }
        }
    }



    if (!Object.values(languages).length) return null








    return (
        <div className="dash-container">

        <h2 id="title-languages">ADD  OR  REMOVE  LANGUAGES</h2>

        <WorldMap handleCountryClick={handleCountryClick} startingLanguages={startingLanguages} />







        {Object.values(languages).map(lang => (

            <div onClick={(e) => handleCountryClick(e)} id={lang.name} className={`${lang.name} ${userLanguages[lang.name] ? 'selected-' + lang.name : ''}  `}></div>

            ))}

            <p id="save-languages" ref={saveChanges} onClick={(e) => handleSave(e)}>SAVE CHANGES</p>

            {message.length && <p className='changes-saved-message'>{message}</p>}

        </div>




    )



}
