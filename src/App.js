import './App.css';
import React,{useState} from 'react'
import Navbar from './components/Navbar';
import Tutors from './components/Tutors';


import {Redirect, Route} from 'react-router-dom'
import TutorProfilePage from './pages/TutorProfilePage'
import MyProfilePage from './pages/MyProfilePage'
import Homepage from './pages/Homepage'

function App() {
    // loggedIn state
    const [loggedIn,setLoggedIn]=useState(
      localStorage.getItem("jwt") !== null
    )
  
  return (
    <>
      <Navbar loggedIn={loggedIn}/>
      <Route exact path ="/" component={Homepage} />
      <Route exact path="/profile">
        {!loggedIn? <Redirect to ="/" /> : <MyProfilePage />}
      </Route>
      <Route path="/tutor/:id" component ={TutorProfilePage}/>

      <br/>
      <div>
      <Tutors/>
      </div>
      <TutorProfilePage/>
      
    </>
  );
}



export default App;
