import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';

export const getUserByHandle = (handle) => {
    return get(ref(db, `users/${handle}`));
};

export const createUser = (handle, uid, email, firstName, lastName) => {
    const createdOn = new Date();
    return set(ref(db, `users/${handle}`), {
        handle,
        uid,
        email,
        createdOn: createdOn.toLocaleDateString(),
        firstName,
        lastName,
    });
};

export const getUserData = (uid) => {
    return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};
