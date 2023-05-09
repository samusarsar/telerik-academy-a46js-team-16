import { Container, Heading } from '@chakra-ui/react';
import PostFeed from '../../Posts/PostFeed/PostFeed';

const ProfilePosts = ({ posts }) => {
    return (
        <Container display={'flex'} flexDirection={'column'} align={'center'} bg={'white'} borderRadius={'10px'} p={'20px'} m={'20px'} boxShadow={'md'}>
            <Heading size='md'>{posts.length} Posts</Heading>
            <PostFeed posts={posts} ></PostFeed>
        </Container>
    );
};

export default ProfilePosts;
