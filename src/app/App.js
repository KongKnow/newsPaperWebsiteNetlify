import { useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setUser } from '../components/pages/formSlice';
import MainPage from '../components/pages/MainPage'
import SingleNewsPage from '../components/pages/SingleNewsPage';
import ListNewsPage from '../components/pages/ListNewsPage';
import LoginPage from '../components/pages/LoginPage';
import SingUpPage from '../components/pages/SingUpPage';
import ProfilePage from '../components/pages/ProfilePage';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail')
    const userUid = localStorage.getItem('userUid')
    const userToken = localStorage.getItem('userToken')
    if (userEmail && userUid && userToken) {
        dispatch(setUser({
            email: userEmail,
            id: userUid,
            token: userToken
        }))
    }
}, [])

  return (
    <Router>
      <Routes>
        <Route path='/category/:category' element={<ListNewsPage/>}/>
        <Route path='/:id' element={<SingleNewsPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/singup' element={<SingUpPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/'  element={<MainPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
