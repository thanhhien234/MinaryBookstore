import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './routes/Home';
import Header from './components/Header';
import AddBook from './routes/AddBook';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/analysis' element={<AddBook/>}/>
      </Routes>    
    </div>
  );
}
export default App;
