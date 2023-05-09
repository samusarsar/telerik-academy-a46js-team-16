import { equalTo, get, orderByChild, push, query, ref, set, update } from 'firebase/database';
import { db } from '../config/firebase-config';

export const addComment = (content, postId, handle) => {

    return push(
        ref(db, 'comments'), { content, postId, author: handle, createdOn: new Date().toLocaleDateString() },
    ).then(result => {
        const commentId = result.key;
        update(ref(db, `comments/${commentId}`), { 'commentId': commentId });
    });
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
                throw new Error('No comments found for this post');
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
    const likedComments = comments.filter(comment => comment.likes).sort((a, b) => b.likes.length - a.likes.length);
    if (likedComments.length > 0) {
        return likedComments[0];
    }
    return [...comments].sort((a, b) => {
        return new Date(b.createdOn) - new Date(a.createdOn);
    })[0];
};
