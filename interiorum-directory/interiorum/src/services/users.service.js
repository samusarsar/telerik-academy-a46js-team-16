import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
import { db, storage } from '../config/firebase-config';
import { uploadBytes, ref as sRef, getDownloadURL } from 'firebase/storage';

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

export const editUser = ({ handle, avatarURL, firstName, lastName }) => {
    return avatarURL ? 
        update(ref(db, `users/${handle}`), {
            avatarURL,
            firstName,
            lastName,
        }) :
        update(ref(db, `users/${handle}`), {
            firstName,
            lastName,
        });
};

export const uploadAvatar = ({ handle, avatar }) => {
    const fileRef = sRef(storage, `users/${handle}/avatar`);
    return uploadBytes(fileRef, avatar)
        .then(() => getDownloadURL(fileRef));
};
