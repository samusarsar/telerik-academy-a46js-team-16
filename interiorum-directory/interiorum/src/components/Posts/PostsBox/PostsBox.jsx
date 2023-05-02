import { Container, Heading, Button, Icon } from '@chakra-ui/react';
import { AiOutlineArrowRight } from 'react-icons/ai';

import PostFeed from '../../Posts/PostFeed/PostFeed.jsx';

const PostsBox = ({ heading, posts }) => {
    return (
        <Container display={'flex'} flexDirection={'column'} align={'center'} bg={'white'} borderRadius={'10px'} p={'20px'} m={'20px'} boxShadow={'2xl'}>
            <Heading size='md'>{heading}</Heading>
            <PostFeed posts={posts}></PostFeed>
            <Button rightIcon={<Icon as={AiOutlineArrowRight} />} colorScheme='telegram' variant='outline'>
                    View all
            </Button>
        </Container>
    );
};

export default PostsBox;
