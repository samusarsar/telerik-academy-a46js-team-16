import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
import { db, storage } from '../config/firebase-config';
import { uploadBytes, ref as sRef, getDownloadURL } from 'firebase/storage';
import { BASE_ROLE } from '../common/constants.js';

export const getUserByHandle = (handle) => {
    return get(ref(db, `users/${handle}`))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No such user.');
            }

            return snapshot.val();
        });
};

export const getUsersByRole = ({ value }) => {
    return get(query(ref(db, 'users'), orderByChild('role'), equalTo(value)))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No such users.');
            }
            return snapshot.val();
        });
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
        role: BASE_ROLE,
    });
};

export const getUserData = (uid) => {
    return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No such user.');
            }

            return snapshot.val();
        });
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

export const changeUserRole = ({ handle, roleType }) => {
    return update(ref(db, `users/${handle}`), {
        role: roleType,
    });
};

export const getAllUsers = () => {
    return get(ref(db, 'users'))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('Can not get users');
            }
            return snapshot.val();
        });
};

export const getTopUsers = (type) => {
    return getAllUsers()
        .then(data => Object.values(data))
        .then(users => users.filter(user => user[type]))
        .then(users => users.sort((a, b) => Object.keys(b[type]).length - Object.keys(a[type]).length).slice(0, 5));
};

export const addLikedPostToUser = ({ handle, postId }) => {
    return get(ref(db, `users/${handle}/likedPosts`))
        .then(snapshot => {
            if (snapshot.exists()) {
                return update(ref(db, `users/${handle}/likedPosts`), {
                    [postId]: true,
                });
            } else {
                return set(ref(db, `users/${handle}/likedPosts`), {
                    [postId]: true,
                });
            }
        });
};

export const removeLikedPostToUser = ({ handle, postId }) => {
    return get(ref(db, `users/${handle}/likedPosts`))
        .then(() => {
            return update(ref(db, `users/${handle}/likedPosts`), {
                [postId]: null,
            });
        });
};

export const addLikedCommentToUser = ({ handle, commentId }) => {
    return get(ref(db, `users/${handle}/likedComments`))
        .then(snapshot => {
            if (snapshot.exists()) {
                return update(ref(db, `users/${handle}/likedComments`), {
                    [commentId]: true
                });
            } else {
                return set(ref(db, `users/${handle}/likedComments`), {
                    [commentId]: true
                });
            }
        });
};

export const removeLikedCommentToUser = ({ handle, commentId }) => {
    return get(ref(db, `users/${handle}/likedComments`))
        .then(() => {
            return update(ref(db, `users/${handle}/likedComments`), {
                [commentId]: null,
            });
        });
};
