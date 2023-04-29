import { Box } from '@chakra-ui/react'

import CreatePostHeader from './CreatePostHeader';
// import CategoriesList from './CategoriesList';

const Forum = () => {
    return (
        <Box className="forum-view">
            <h1>Forum view</h1>
            <CreatePostHeader />
            <CategoriesList />
            <CategoriesList />
        </Box>
    );
};

export default Forum;
