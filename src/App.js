import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './routes/Home';
import Header from './components/Header';
import DetailBook from './routes/DetailBook';
import BookSale from './routes/BookSale';

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/detail-book/:bookId' element={<DetailBook />} />
        <Route path='/book-sale' element={<BookSale/>} />
      </Routes>    
    </div>
  );
}
export default App;
