import Header from "./components/header/Header";
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
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
import UserTable from "./pages/admin/UserTable";
import PostTable from "./pages/admin/PostTable";
import CategoryTable from "./pages/admin/CategoryTable";
import CommentTable from "./pages/admin/CommentTable";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFound from "./pages/not-found/NotFound";
import { useSelector } from "react-redux";

function App() {
  const {user} = useSelector(state=>state.auth)
  return (
      <BrowserRouter>
      <Header />
        <Routes>
          <Route exact path="/" element={<Home/>} />

          <Route path="/posts" element={<Post/>} />
          <Route path="/post/createPost" element={user ? <CreatePost />:<Navigate to='/'/>}/>
          <Route path="/posts/detail/:id" element={<PostDetail />}/>
          <Route path="/posts/categories/:category" element={<Category />}/>

          {/* <Route index path="post">
            
          </Route> */}



          {/* <Route path="/admin" element={<UserTable />}/> */}
      
          <Route path="/Register" element={ !user ? <Register />: <Navigate to='/'/>}/>
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path="/reset-password" element={<ResetPassword />}/>
          <Route path="/Login" element={!user ? <Login />: <Navigate to='/'/> } />
          <Route path="/profile/:id" element={<Profile/>}></Route>
          <Route path="/admin-dashbord" element={user?.isAdmin ? <Admin /> : <Navigate to='/'/>}/>
          <Route path="/admin-dashbord/users-table" element={user?.isAdmin ? <UserTable /> : <Navigate to='/'/>}/>
          <Route path="/admin-dashbord/posts-table" element={user?.isAdmin ? <PostTable /> : <Navigate to='/'/>}/>
          <Route path="/admin-dashboard/categories-table" element={user?.isAdmin ? <CategoryTable /> : <Navigate to='/'/>}/>
          <Route path="/admin-dashboard/comments-table" element={user?.isAdmin ? <CommentTable /> : <Navigate to='/'/>}/>
          <Route path="*" element={<NotFound />}/>

        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
