import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './routes/Home';
import Header from './components/Header';
import DetailBook from './routes/DetailBook';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/detail-book/:bookId' element={<DetailBook disable={true}/>} />
      </Routes>    
    </div>
  );
}
export default App;
