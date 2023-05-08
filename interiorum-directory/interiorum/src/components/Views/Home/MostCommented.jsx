import { useEffect, useState } from 'react';

import PostsBox from '../../Posts/PostsBox/PostsBox.jsx';
import { getPostsByCategory, sortPostsByPopularity } from '../../../services/post.service.js';

const MostCommented = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPostsByCategory()
            .then(allPosts => {
                setPosts(sortPostsByPopularity(allPosts).slice(0, 10));
            });
    }, []);

    return (
        <PostsBox heading='Most Commented Posts:' posts={posts} />
    );
};

export default MostCommented;
