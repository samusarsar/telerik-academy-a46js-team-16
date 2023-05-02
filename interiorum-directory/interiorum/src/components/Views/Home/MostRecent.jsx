import { useState } from 'react';
import { posts as postsData } from '../../../../data.js';

import PostsBox from '../../Posts/PostsBox/PostsBox.jsx';

const MostRecent = () => {
    const [posts, setPosts] = useState(postsData);

    // useEffect(() => {
    //     fetch()
    //         .then((response) => response.json())
    //         .then((data) => setPosts(data.slice(data.length - 11)));
    // });

    return (
        <PostsBox heading='Most Recent Posts:' posts={posts} />
    );
};

export default MostRecent;
