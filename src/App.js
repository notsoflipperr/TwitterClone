
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Home from './Pages/Home';
import Signup from './Pages/Login/Signup';
import ProtectedRoute from './Pages/ProtectedRoute';
import PageLoading from './Pages/PageLoading';
import Explore from './Pages/Explore/Explore';
import Notifications from './Pages/Notifications/Notifications';
import Messages from './Pages/Messages/Messages';
import Bookmarks from './Pages/Bookmarks/Bookmarks';
import Lists from './Pages/Lists/Lists';
import Feed from './Pages/Feed/Feed';
import Profile from './Pages/Profile/Profile';
import More from './Pages/More/More';
import PhoneNumber from './Pages/Login/PhoneNumber';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element = {<ProtectedRoute><Home /></ProtectedRoute>}>
          <Route index element={<Feed />}/>
        </Route>
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>}>
            <Route path='feed' element={<Feed />}/> 
            <Route path='explore' element={<Explore />}/> 
            <Route path='notifications' element={<Notifications />}/> 
            <Route path='messages' element={<Messages />}/> 
            <Route path='bookmarks' element={<Bookmarks />}/> 
            <Route path='lists' element={<Lists />}/> 
            <Route path='profile' element={<Profile />}/> 
            <Route path='more' element={<More />}/> 
        </Route>
        <Route path='/login' element = {<Login />} />
        <Route path='/signup' element = {<Signup />} />
        <Route path='/phonenumber' element = {<PhoneNumber />} />
        <Route path='/page-loading' element = {<PageLoading />} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
