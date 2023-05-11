import { get, ref, set, update } from 'firebase/database';
import { db } from '../config/firebase-config';

export const addPostToTag = ({ tag, postId }) => {
    return get(ref(db, `tags/${tag}`))
        .then(snapshot => {
            if (snapshot.exists()) {
                update(ref(db, `tags/${tag}`), {
                    [postId]: true,
                });
            } else {
                set(ref(db, `tags/${tag}`), {
                    [postId]: true,
                });
            }
        });
};

export const removePostFromTag = ({ tag, postId }) => {
    return update(ref(db, `tags/${tag}`), {
        [postId]: null,
    });
};

export const addTagToPost = ({ tag, postId }) => {
    return get(ref(db, `posts/${postId}/tags`))
        .then(snapshot => {
            if (snapshot.exists()) {
                update(ref(db, `posts/${postId}/tags`), {
                    [tag]: true,
                });
            } else {
                set(ref(db, `posts/${postId}/tags`), {
                    [tag]: true,
                });
            }
        });
};

export const removeTagFromPost = ({ tag, postId }) => {
    return update(ref(db, `posts/${postId}/tags`), {
        [tag]: null,
    });
};
