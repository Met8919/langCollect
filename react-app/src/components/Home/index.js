import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getLanguages, getUserLanguages } from "../../store/language";




export default function Home() {




    const dispatch = useDispatch()
    const languages = useSelector(state => state.languages.languages)
    const userLanguages = useSelector(state => state.languages.userLanguages)





    useEffect(() => {
        dispatch(getLanguages())
        dispatch(getUserLanguages())

    },[dispatch])




    if (!Object.values(languages).length || !Object.values(languages).length) return null






    return (
        <>

        {Object.values(languages).map(language => (
            <p>{language.name}</p>
        ))}


        {Object.values(userLanguages).map(language => (
            <p>{language.name}</p>
        ))}

        </>



    )



}
