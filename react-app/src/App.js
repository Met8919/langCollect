import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Decks from "./components/Decks/Decks";
import Nav from "./components/Nav";
import DeckForm from "./components/DeckForm/DeckForm";
import UpdateDeckForm from "./components/UpdateDeckForm/UpdateDeckForm";
import CardReview from "./components/CardReview/CardReview";
import Chat from "./components/Chat/Chat";
import { getLanguages, getUserLanguages, setStartingLanguages } from "./store/language";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const userLanguages = useSelector(state => state.languages.userLanguages)
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {

    if (sessionUser !== null) {
        dispatch(getLanguages())
        dispatch(getUserLanguages(sessionUser.id)).then((langs) => {

          dispatch(setStartingLanguages(langs))

        })

        console.log('setting userLangs')
    }


},[sessionUser])



  return (
    <>
      {isLoaded && !sessionUser && <Navigation isLoaded={isLoaded} />}
      {isLoaded && sessionUser && (
        <>
      <Nav />
        <Switch>
          <Route exact path='/'>

            <Home />

          </Route>
          <Route exact path='/chat'>
            <Chat />

          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/decks'>
            <Decks />

          </Route>
          <Route exact path='/decks/new'>
            <DeckForm />
          </Route>
          <Route exact path={`/decks/update/:deckId`}>
            <UpdateDeckForm />
          </Route>
          <Route excat path={`/decks/:deckId`}>
            <CardReview />
          </Route>
        </Switch>
        </>
      )}
    </>
  );
}

export default App;
