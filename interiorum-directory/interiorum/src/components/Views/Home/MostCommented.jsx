import { useState } from 'react';
import { posts as postsData } from '../../../../data.js';

import PostsBox from '../../Posts/PostsBox/PostsBox.jsx';

const MostCommented = () => {
    const [posts, setPosts] = useState(postsData);

    // useEffect(() => {
    //     fetch()
    //         .then((response) => response.json())
    //         .then((data) => data.sort((post1, post2) => post1.comments.length - post2.comments.length))
    //         .then((data) => setPosts(data.slice(0, 9)));
    // });

    return (
        <PostsBox heading='Most Commented Posts:' posts={posts} />
    );
};

export default MostCommented;
