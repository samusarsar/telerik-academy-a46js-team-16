import { push, ref } from 'firebase/database';
import { db } from '../config/firebase-config';

export const addComment = ({ content, postID, handle }) => {

    return push(
        ref(db, 'posts'), { content, postID, author: handle, createdOn: new Date().toLocaleDateString() },
    );
};
