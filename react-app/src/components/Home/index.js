import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getLanguages, getUserLanguages } from "../../store/language";

import './Home.css'



export default function Home() {








    const dispatch = useDispatch()
    const languages = useSelector(state => state.languages.languages)
    const userLanguages = useSelector(state => state.languages.userLanguages)


    const image = require('./world.svg.png')

    const handleCountryClick =() => {



    }




    useEffect(() => {
        dispatch(getLanguages())
        dispatch(getUserLanguages())

    },[dispatch])




    if (!Object.values(languages).length || !Object.values(languages).length) return null






    return (
        <div className="dash-container">

        <h2 id="title-languages">ADD  OR  REMOVE  LANGUAGES</h2>
        <img src={image.default} alt="test"/>





        <p id="save-languages">SAVE CHANGES</p>
        <div onClick={(e) => handleCountryClick(e)} id="Brazil" ></div>
        <div id="Russia"></div>

        </div>



    )



}
