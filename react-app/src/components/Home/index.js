import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addUserLanguage, clearCurrentLanguage, createUserLanguage, deleteUserLanguage, getLanguages, getUserLanguages, removeUserLanguage, setStartingLanguages } from "../../store/language";

import './Home.css'



export default function Home() {








    const dispatch = useDispatch()
    const languages = useSelector(state => state.languages.languages)
    const userLanguages = useSelector(state => state.languages.userLanguages)
    const currentLanguage = useSelector(state => state.languages.currentLanguage)
    const user = useSelector(state => state.session.user)

    // const [startingLanguages,setStartingLanguages] = useState({})
    const startingLanguages = useSelector(state => state.languages.startingLanguages)
    const image = require('./world.svg.png')










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





    }


    const handleCountryClick = (e) => {

        const countryDiv = e.target
        const currentCountry = languages[countryDiv.id]


        if (!countryDiv.classList.contains(`selected-${e.target.id}`)) {

            e.target.classList.add(`selected-${e.target.id}`)
            dispatch(addUserLanguage(currentCountry))

        }   else {

            e.target.classList.remove(`selected-${e.target.id}`)
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
        <img src={image.default} alt="test"/>







        {Object.values(languages).map(lang => (

            <div onClick={(e) => handleCountryClick(e)} id={lang.name} className={`${lang.name} ${userLanguages[lang.name] ? 'selected-' + lang.name : ''}  `}></div>

            ))}

            <p id="save-languages" onClick={(e) => handleSave(e)}>SAVE CHANGES</p>
        </div>



    )



}
