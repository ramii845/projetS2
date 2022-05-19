
import './App.css';
import Header from './components/Header/Header'; 
import Footer from './components/Footer/Footer';
import LandingPage from './screens/LandingPage/LandingPage';
import { BrowserRouter, Route, } from 'react-router-dom'
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginScreen/LoginScreen';

import SignupScreen from './screens/SignupScreen/SignupScreen';
import CreateNote from './screens/CreateNote/CreateNote';
import SingleNote from './screens/SingleNote/SingleNote';
import { useState } from 'react';





const App = () =>
     
      { 
        const [search, setSearch] = useState("");

        return (
    <BrowserRouter>
      <Header  setSearch={ setSearch} /> 
      <main>
        <Route path='/' component={LandingPage} exact />
        <Route path='/login' component={LoginScreen}  />
        <Route path='/registre' component={SignupScreen}  />
        <Route path='/createnote' component={CreateNote}  />
        <Route path='/note/:id' component={SingleNote}  />
        <Route path='/mynotes' component={() => <MyNotes  search={search} />} />
        
        
         </main>
      <Footer />
    </BrowserRouter>
       );}


export default App;
