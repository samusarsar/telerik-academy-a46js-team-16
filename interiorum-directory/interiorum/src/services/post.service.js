import { get, push, query, ref } from 'firebase/database';
import { db } from '../config/firebase-config';

export const addPost = (title, content, categories, handle) => {

    return push(
        ref(db, 'posts'), { title, content, categories, author: handle, createdOn: new Date().toLocaleDateString()}
    );
    // .then(result => {
    //     // console.log(result); // TODO
    // });
};

export const getPosts = () => {
    return get(query(ref(db, 'posts')))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No posts match the search criteria'); // TODO
            }
            return snapshot.val();
        })
        .then(posts => {
            return Object.keys(posts).map(postId => {
                return {
                    ...posts[postId],
                };
            });
        });
};

export const getPostsByCategory = (category) => {
    
};

export const sortPostsByDate = (posts) => {

};

export const sortPostsByPopularity = (posts) => {

};

export const filterUnansweredPosts = (posts) => {

};