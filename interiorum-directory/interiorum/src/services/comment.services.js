import { equalTo, get, orderByChild, push, query, ref } from 'firebase/database';
import { db } from '../config/firebase-config';

export const addComment = ({ content, postID, handle }) => {

    return push(
        ref(db, 'posts'), { content, postID, author: handle, createdOn: new Date().toLocaleDateString() },
    );
};

export const getCommentsByAuthor = (handle) => {
    return get(query(ref(db, 'comments'), orderByChild('author'), equalTo(handle)));
};

export const getCommentsByPost = (postID) => {
    return get(query(ref(db, 'comments'), orderByChild('commentedOn'), equalTo(postID)));
};
