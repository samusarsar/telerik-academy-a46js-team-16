import { useEffect, useState } from 'react';

import PostsBox from '../../Posts/PostsBox/PostsBox.jsx';
import { getPostsByCategory, sortPostsByDate } from '../../../services/post.service.js';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config.js';

const MostRecent = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        onValue(ref(db, 'posts'), () => {
            getPostsByCategory()
                .then(allPosts => {
                    setPosts(sortPostsByDate(allPosts).slice(0, 10));
                });
        });
    }, []);

    return (
        <PostsBox heading='Most Recent Posts:' posts={posts} />
    );
};

export default MostRecent;
