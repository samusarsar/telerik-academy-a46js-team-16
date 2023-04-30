import { createContext } from 'react';

export const UserContext = createContext({
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    setUsername: () => {},
    setFirstName: () => {},
    setLastName: () => {},
    setEmail: () => {},
    setPassword: () => {},
});
