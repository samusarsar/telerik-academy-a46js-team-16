import { Container, Heading, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { posts as postsData } from '../../../../data.js';

import PostFeed from '../../Posts/PostFeed/PostFeed.jsx';

const MostRecent = () => {
    const [posts, setPosts] = useState(postsData);

    // useEffect(() => {
    //     fetch()
    //         .then((response) => response.json())
    //         .then((data) => setPosts(data.slice(data.length - 11)));
    // });

    return (
        <Container display={'flex'} flexDirection={'column'} align={'center'} bg={'white'} borderRadius={'10px'} p={'20px'} m={'20px'} boxShadow={'md'}>
            <Heading size='md'>Most Recent Posts:</Heading>
            <PostFeed posts={posts}></PostFeed>
            <Button rightIcon={AiOutlineArrowRight} colorScheme='teal' variant='outline'>
                View all
            </Button>
        </Container>
    );
};

export default MostRecent;
