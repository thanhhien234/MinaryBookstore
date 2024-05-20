import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './routes/Home';
import Header from './components/Header';
import DetailBook from './routes/DetailBook';
import CreateBook from './routes/CreateBook';
import BookList from './routes/BookList';

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/detail-book/:bookId' element={<DetailBook />} />
        <Route path='/create-book/:option' element={<CreateBook/>} />
        <Route path='/book-list/:status/:category' element={<BookList/>} />
      </Routes>    
    </div>
  );
}
export default App;
