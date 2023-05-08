import { equalTo, get, orderByChild, push, query, ref, update } from 'firebase/database';
import { db } from '../config/firebase-config';

export const addComment = (content, postId, handle) => {

    return push(
        ref(db, 'comments'), { content, postId, author: handle, createdOn: new Date().toLocaleDateString() },
    ).then(result => {
        const commentId = result.key;
        update(ref(db, `comments/${commentId}`), { 'commentId': commentId });
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
