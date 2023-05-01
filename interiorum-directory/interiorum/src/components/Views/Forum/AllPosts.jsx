import { Heading, Box } from '@chakra-ui/react';

import { posts } from '../../../../data.js';
import ForumTabs from './ForumTabs.jsx';


const AllPosts = () => {

    // fetch all posts

    return (
        <Box bg={'white'} borderRadius={'10px'} p={'20px'} m={'20px'} boxShadow={'md'}>
            <Heading size='xl' mb='15px'>All posts</Heading>
            <ForumTabs posts={posts} />
        </Box>
    );
};

export default AllPosts;

