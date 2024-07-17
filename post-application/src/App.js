import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostList from './Features/posts/PostList';
import AddPostForm from './Features/posts/AddPostForm';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <br/>
        <br/>
        <br/>
        <Routes>
          <Route path="/" element ={<PostList />}/>        
            
          <Route path="/add" element={<AddPostForm />}/>
          
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
