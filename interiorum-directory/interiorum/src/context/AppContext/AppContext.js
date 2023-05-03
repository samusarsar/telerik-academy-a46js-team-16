import { createContext } from 'react';

export const AppContext = createContext({
    isLoggedIn: false,
    toggleLogin: () => {},
    // user: null,
    // userData: null,
    // setContext: () => {},
});
