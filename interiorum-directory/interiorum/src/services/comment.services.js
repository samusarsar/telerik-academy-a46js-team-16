import { equalTo, get, orderByChild, push, query, ref, remove, set, update } from 'firebase/database';
import { db } from '../config/firebase-config';

export const addComment = (content, postId, handle) => {

    return push(
        ref(db, 'comments'), { content, postId, author: handle, createdOn: new Date().toLocaleString() },
    ).then(result => {
        const commentId = result.key;
        update(ref(db, `comments/${commentId}`), { 'commentId': commentId });
        addCommentToUser(handle, commentId);
        addCommentToPost(postId, commentId);
    });
};

const addCommentToUser = (handle, commentId) => {
    return get(ref(db, `users/${handle}/comments`))
        .then(snapshot => {
            if (snapshot.exists()) {
                return update(ref(db, `users/${handle}/comments`), {
                    [commentId]: true });
            } else {
                return set(ref(db, `users/${handle}/comments`), {
                    [commentId]: true });
            }
        });
};

const addCommentToPost = (postId, commentId) => {
    return get(ref(db, `posts/${postId}/comments`))
        .then(snapshot => {
            if (snapshot.exists()) {
                return update(ref(db, `posts/${postId}/comments`), {
                    [commentId]: true });
            } else {
                return set(ref(db, `posts/${postId}/comments`), {
                    [commentId]: true });
            }
        });
};

export const deleteComment = (handle, commentId) => {

    get(ref(db, `comments/${commentId}/postId`))
        .then(snapshot => snapshot.val())
        .then(postId => deleteCommentToPost(postId, commentId))
        .then(() => deleteCommentToUser(handle, commentId))
        .then(() => remove(ref(db, `comments/${commentId}`)));
};

const deleteCommentToUser = (handle, commentId) => {
    return remove(ref(db, `users/${handle}/comments/${commentId}`));
};

const deleteCommentToPost = (postId, commentId) => {
    return remove(ref(db, `posts/${postId}/comments/${commentId}`));
};

export const getCommentById = (commentId) => {
    return get(ref(db, `comments/${commentId}`))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No comments match the search criteria');
            }
            return snapshot.val();
        });
};

export const getCommentsByAuthor = (handle) => {
    return get(query(ref(db, 'comments'), orderByChild('author'), equalTo(handle)));
};

export const getCommentsByPost = (postID) => {
    return get(query(ref(db, 'comments'), orderByChild('postId'), equalTo(postID)))
        .then(snapshot => {
            if (!snapshot.exists()) {
                return {};
            }
            return snapshot.val();
        })
        .then(comments => {
            return Object.keys(comments).map(commentId => {
                return {
                    ...comments[commentId],
                };
            });
        });
};

export const addLikeToComment = ({ commentId, handle }) => {
    get(ref(db, `comments/${commentId}/likes`))
        .then(snapshot => {
            if (snapshot.exists()) {
                update(ref(db, `comments/${commentId}/likes`), {
                    [handle]: true,
                });
            } else {
                set(ref(db, `comments/${commentId}/likes`), {
                    [handle]: true,
                });
            }
        });
};

export const removeLikeToComment = ({ commentId, handle }) => {
    get(ref(db, `comments/${commentId}/likes`))
        .then(() => {
            update(ref(db, `comments/${commentId}/likes`), {
                [handle]: null,
            });
        });
};


export const getFeaturedComment = (comments) => {
    const sortedByDate = [...comments].sort((a, b) => {
        return new Date(b.createdOn) - new Date(a.createdOn);
    });
    const likedComments = sortedByDate.filter(comment => comment.likes).sort((a, b) => b.likes.length - a.likes.length);

    if (likedComments.length > 0) {
        return likedComments[0];
    }
    return sortedByDate[0];
};

export const editComment = ({ commentId, content }) => {
    return update(ref(db, `comments/${commentId}`), {
        content,
        lastEdited: new Date().toLocaleString(),
    });
};
