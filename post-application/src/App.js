import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostList from './Features/posts/PostList';
import AddPostForm from './Features/posts/AddPostForm';
import Navbar from './Components/Navbar';
import SinglePost from './Features/posts/SinglePost';
import EditPostForm from './Features/posts/EditPostForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <br/>
        <br/>
        <Routes>
          <Route path="/" element ={<PostList />}/>        
            
          <Route path="/add" element={<AddPostForm />}/>

          <Route path = "/post/:postId" element={<SinglePost/>}/>

          <Route path = "/post/edit/:postId" element={<EditPostForm/>}/>
          
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
