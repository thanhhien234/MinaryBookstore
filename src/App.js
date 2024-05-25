import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './routes/Home';
import Header from './components/Header';
import DetailBook from './routes/DetailBook';
import CreateBook from './routes/CreateBook';
import BookList from './routes/BookList';
import MyPage from './routes/MyPage';
import EditBook from './routes/EditBook';
import SearchBookList from './routes/SearchBookList';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/detail-book/:bookState/:bookId' element={<DetailBook />} />
        <Route path='/create-book/:option' element={<CreateBook/>} />
        <Route path='/book-list/:status/:category' element={<BookList/>} />
        <Route path='/search-book-list/:option/:input' element={<SearchBookList/>} />
        <Route path='/my-page' element={<MyPage/>} />
        <Route path='/edit-book/:option/:bookId' element={<EditBook/>} />
      </Routes>    
    </div>
  );
}
export default App;
