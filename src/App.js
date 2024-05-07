import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './routes/Home';
import AddBook from './routes/AddBook';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/analysis' element={<AddBook/>}/>
      </Routes>    
    </div>
  );
}
export default App;
