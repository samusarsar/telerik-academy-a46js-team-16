import { Routes, Route, Navigate } from 'react-router-dom';

import RootLayout from './components/Views/RootLayout/RootLayout.jsx';
import Home from './components/Views/Home/Home.jsx';
import About from './components/Views/About/About.jsx';
import Forum from './components/Views/Forum/Forum.jsx';
import Profile from './components/Views/Profile/Profile.jsx';
import { AppContext } from './context/AppContext/AppContext.js';
import { useEffect, useState } from 'react';
import ProtectedRoute from './components/Base/ProtectedRoute/ProtectedRoute.jsx';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getUserData } from './services/users.service';
import LogIn from './components/Views/AccountViews/LogIn.jsx';
import SignUp from './components/Views/AccountViews/SignUp.jsx';
import CategoryPosts from './components/Views/Forum/CategoryPosts.jsx';
import { auth, db } from './config/firebase-config.js';

import './App.css';
import PostDetails from './components/Posts/PostDetails/PostDetails.jsx';
import ProfileLayout from './components/Views/Profile/ProfileLayout.jsx';

const App = () => {
    const [user, loading, error] = useAuthState(auth);
    const [dataLoading, setDataLoading] = useState(false);
    const [appState, setAppState] = useState({
        user,
        userData: null,
    });

    if (appState.user !== user) {
        setAppState({ user });
    }

    useEffect(() => {
        setDataLoading(true);
        if (user === null) return;

        getUserData(user.uid)
            .then(snapshot => {
                if (!snapshot.exists()) {
                    throw new Error('Something went wrong!');
                }

                setAppState({
                    ...appState,
                    userData: snapshot.val()[Object.keys(snapshot.val())[0]],
                });
            })
            .catch(e => alert(e.message))
            .finally(() => setDataLoading(false));
    }, [user]);

    if (!loading && !dataLoading) {
        return (
            <>
                <AppContext.Provider value={{ ...appState, setContext: setAppState }}>
                    <Routes>
                        <Route path='/' element={<RootLayout />}>
                            <Route index element={<Home />} />
                            <Route path='home' element={<Home />} />
                            <Route path='about' element={<About />} />
                            <Route element={<ProtectedRoute user={appState.user} />} >
                                <Route path='forum' element={<Forum />}>
                                    <Route index element={<Navigate replace to='allCategories' />} />
                                    <Route path=':category' element={<CategoryPosts />}>
                                    </Route>
                                </Route>
                                <Route path='post/:postTitle' element={<PostDetails />} />
                                <Route path='profile/:handle' element={<ProfileLayout />} />
                            </ Route>
                            <Route path='log-in' element={<LogIn />} />
                            <Route path='sign-up' element={<SignUp />} />
                        </Route>
                    </Routes>
                </AppContext.Provider>
            </>);
    };
};

export default App;
