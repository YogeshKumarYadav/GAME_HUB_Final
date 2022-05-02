import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Profile from './components/Profile/Profile.js';
import About from './components/About/About.js'; 
import Logout from './components/Logout/Logout.js';
import { Route, Routes } from 'react-router-dom';
import { createContext, useContext, useReducer } from 'react';
import { initialState, reducer } from './reducer/UseReducer';

export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="bodydiv">
      <UserContext.Provider value={{state, dispatch}}> 
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/logout' element={<Logout/>}/>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;