import { useParams } from 'react-router-dom';

import { Heading, Text, Box } from '@chakra-ui/react';

import { posts } from '../../../../data';
import ForumTabs from './ForumTabs';


const CategoryPosts = () => {

    const { category } = useParams();

    const categoryPosts = posts.filter(post => post.category === category); // fetch posts by category

    return (
        <Box bg={'white'} borderRadius={'10px'} p={'20px'} m={'20px'} boxShadow={'md'}>
            <Text fontStyle='italic'>posts from category</Text>
            <Heading size='xl' mb='15px'>{category}</Heading>
            <ForumTabs posts={categoryPosts} />
        </Box>
    );

};

export default CategoryPosts;
