import { Routes, Route } from 'react-router-dom';

import RootLayout from './components/Views/RootLayout/RootLayout.jsx';
import Home from './components/Views/Home/Home.jsx';
import About from './components/Views/About/About.jsx';
import Forum from './components/Views/Forum/Forum.jsx';
import Profile from './components/Views/Profile/Profile.jsx';
import { AuthContext } from './context/AuthContext/AuthContext.js';
import { UserContext } from './context/UserContext/UserContext.js';
import { useState } from 'react';
import ProtectedRoute from './components/Base/ProtectedRoute/ProtectedRoute.jsx';

import './App.css';
import LogIn from './components/Views/LogIn-SignUp/LogIn.jsx';
import SignUp from './components/Views/LogIn-SignUp/SignUp.jsx';
import AllPosts from './components/Views/Forum/AllPosts.jsx';
import CategoryPosts from './components/Views/Forum/CategoryPosts.jsx';

const App = () => {
    const [isLoggedIn, toggleLogin] = useState(true);
    const [username, setUsername] = useState('test');
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState('12345');

    return (
        <>
            <AuthContext.Provider value={{ setLoginState: toggleLogin, isLoggedIn }}>
                <UserContext.Provider value={{ username, firstName, lastName, email, password, setUsername, setFirstName, setLastName, setEmail, setPassword }}>
                    <Routes>
                        <Route path='/' element={<RootLayout />}>
                            <Route index element={<Home />} />
                            <Route path='home' element={<Home />} />
                            <Route path='about' element={<About />} />
                            <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />} >
                                <Route path='forum' element={<Forum />}>
                                    <Route index element={<AllPosts />} />
                                    <Route path=':category' element={<CategoryPosts />} />
                                </Route>
                                <Route path='profile' element={<Profile />} />
                            </ Route>
                            <Route path='log-in' element={<LogIn />} />
                            <Route path='sign-up' element={<SignUp />} />
                        </Route>
                    </Routes>
                </UserContext.Provider>
            </AuthContext.Provider>
        </>);
};

export default App;
