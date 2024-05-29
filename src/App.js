import './App.css';
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser } from './store/slices/userSlice';
import { getCookie, setCookie } from './utils/cookieManage';
import { getUserInfoApi } from './api/getUserInfoApi';
import Header from './components/Header/Header';
import Home from './routes/Home';
import DetailBook from './routes/DetailBook';
import CreateBook from './routes/CreateBook';
import BookList from './routes/BookList';
import MyPage from './routes/MyPage';
import EditBook from './routes/EditBook';
import SearchBookList from './routes/SearchBookList';
import Redirect from './routes/Redirect';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!getCookie("accessToken") && getCookie("refreshToken")) {
      fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie("refreshToken")}`
        }
      })
        .then(response => response.json())
        .then(res => {
          setCookie("accessToken", res.accessToken, 2 * 60);
          setCookie("refreshToken", res.refreshToken, 24 * 14 * 60);
          getUserInfoApi()
            .then(res => dispatch(setUser({ name: res.name, img: res.img })))
            .catch(error => console.log(error));
        })
        .catch(error => {
          alert("관리자에게 문의해주세요.");
        });
    }
    else if (getCookie("accessToken")) {
      getUserInfoApi()
        .then(res => dispatch(setUser({ name: res.name, img: res.img })))
        .catch(error => console.log(error));
    }
    navigate('/');
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detail-book/:bookId' element={<DetailBook />} />
        <Route path='/create-book/:option' element={<CreateBook />} />
        <Route path='/book-list/:option/:category' element={<BookList />} />
        <Route path='/search-book-list/:option/:input' element={<SearchBookList />} />
        <Route path='/my-page' element={<MyPage />} />
        <Route path='/edit-book/:option/:bookId' element={<EditBook />} />
        <Route path='/redirect' element={<Redirect />} />
      </Routes>
    </div>
  );
}
export default App;
