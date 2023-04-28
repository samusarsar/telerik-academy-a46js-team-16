import { Box } from '@chakra-ui/react'

import CreatePostHeader from './CreatePostHeader';

const Forum = () => {
    return (
        <Box w='2xl' className="forum-view">
            <h1>Forum view</h1>
            <CreatePostHeader />
        </Box>
    );
};

export default Forum;
