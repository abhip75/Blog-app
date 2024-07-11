import { Route, Routes } from 'react-router-dom';
import './App.css';
import Blog from './components/Blog';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Blog/>}/>
      </Routes>
    </div>
  );
}

export default App;
