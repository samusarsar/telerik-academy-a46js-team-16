import { Routes, Route, Navigate } from 'react-router-dom';

import RootLayout from './components/Views/RootLayout/RootLayout.jsx';
import Home from './components/Views/Home/Home.jsx';
import About from './components/Views/About/About.jsx';
import Forum from './components/Views/Forum/Forum.jsx';
import Profile from './components/Views/Profile/Profile.jsx';
import IndividualPost from './components/Views/IndividualPost/IndividualPost.jsx';
import LogIn from './components/Views/AccountViews/LogIn.jsx';
import SignUp from './components/Views/AccountViews/SignUp.jsx';
import CategoryPosts from './components/Views/Forum/CategoryPosts.jsx';
import NotFound from './components/Views/NotFound/NotFound.jsx';
import ProtectedRoute from './components/Base/ProtectedRoute/ProtectedRoute.jsx';

import { AppContext } from './context/AppContext/AppContext.js';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getUserData } from './services/users.service';

import { auth, db } from './config/firebase-config.js';

import './App.css';

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
        if (user === null) {
            return;
        }

        setDataLoading(true);

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
                            <Route index element={<Navigate replace to='home' />} />
                            <Route path='home' element={<Home />} />
                            <Route path='about' element={<About />} />
                            <Route element={<ProtectedRoute user={appState.user} />} >
                                <Route path='forum' element={<Forum />}>
                                    <Route index element={<Navigate replace to='allCategories' />} />
                                    <Route path=':category' element={<CategoryPosts />}>
                                    </Route>
                                </Route>
                                <Route path='post/:postTitle' element={<IndividualPost />} />
                                {appState.userData && <Route path='my-profile' element={<Navigate replace to={`../profile/${appState.userData.handle}`} />} />}
                                <Route path='profile/:handle' element={<Profile />} />
                                <Route path='log-in' element={<LogIn />} />
                                <Route path='sign-up' element={<SignUp />} />
                            </ Route>
                            <Route path='*' element={<NotFound />} />
                        </Route>
                    </Routes>
                </AppContext.Provider>
            </>);
    };
};

export default App;
