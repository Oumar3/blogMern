import Header from "./components/header/Header";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Post from './pages/post-pages/Post'
import CreatePost from './pages/createPost/CreatePost'
import Admin from './pages/admin/AdminDashboard'
import Register from './pages/forms/Register'
import Login from './pages/forms/Login'
import Footer from './components/footer/Footer'
import PostDetail from "./pages/post-details/PostDetail";
import Category from "./pages/category/Category";
import Profile from "./pages/profile/Profile";

function App() {
  return (
      <BrowserRouter>
      <Header />
        <Routes>
          <Route exact path="/" element={<Home/>} />

          <Route path="/posts" element={<Post/>} />
          <Route path="/post/createPost" element={<CreatePost />}/>
          <Route path="/posts/detail/:id" element={<PostDetail />}/>
          <Route path="/posts/categories/:category" element={<Category />}/>

          {/* <Route index path="post">
            
          </Route> */}

          <Route path="/admin" element={<Admin />}/>
          <Route path="/Register" element={<Register />}/>
          <Route path="/Login" element={<Login />}/>
          <Route path="/profile/:id" element={<Profile/>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
