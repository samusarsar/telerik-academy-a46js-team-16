import { push, ref } from 'firebase/database';
import { db } from '../config/firebase-config';

export const addPost = (title, content, categories, handle) => {

    return push(
        ref(db, 'posts'), { title, content, categories, author: handle, createdOn: new Date().toLocaleDateString() };
    );
        // .then(result => {
        //     // console.log(result); // TODO
        // });
};
