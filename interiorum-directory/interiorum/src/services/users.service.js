import { get, set, ref, query, equalTo, orderByChild, update, push } from 'firebase/database';
import { db, storage } from '../config/firebase-config';
import { uploadBytes, ref as sRef, getDownloadURL } from 'firebase/storage';
import { BASE_ROLE } from '../common/constants.js';

export const getUserByHandle = (handle) => {
    return get(ref(db, `users/${handle}`));
};

export const getUsersByChild = ({ child, value }) => {
    return get(query(ref(db, 'users'), orderByChild('role'), equalTo(value)));
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

export const changeUserRole = ({ handle, roleType }) => {
    return update(ref(db, `users/${handle}`), {
        role: roleType,
    });
};

export const approveAdmin = ({ handle }) => {
    return update(ref(db, `users/${handle}`), {
        role: 'admin',
    });
};

export const getAllUsers = () => {
    return get(ref(db, 'users'));
};

export const addPostToUser = ({ handle, postID }) => {
    return get(ref(db, `users/${handle}/posts`))
        .then(snapshot => {
            if (snapshot.exists()) {
                return update(ref(db, `users/${handle}/posts`), {
                    postID: true });
            } else {
                return set(ref(db, `users/${handle}/posts`), {
                    postID: true });
            }
        });
};

export const addCommentToUser = ({ handle, commentID }) => {
    return get(ref(db, `users/${handle}/comments`))
        .then(snapshot => {
            if (snapshot.exists()) {
                return update(ref(db, `users/${handle}/comments`), {
                    postID: true });
            } else {
                return set(ref(db, `users/${handle}/comments`), {
                    postID: true });
            }
        });
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

export const addLikedCommentToUser = ({ handle, commentID }) => {
    return get(ref(db, `users/${handle}/likedComments`))
        .then(snapshot => {
            if (snapshot.exists()) {
                return update(ref(db, `users/${handle}/likedComments`), {
                    postID: true });
            } else {
                return set(ref(db, `users/${handle}/likedComments`), {
                    postID: true });
            }
        });
};
