import { Container, Heading } from '@chakra-ui/react';
import PostFeed from '../../Posts/PostFeed/PostFeed';
import PropTypes from 'prop-types';

const ProfilePosts = ({ posts }) => {
    return (
        <Container display={'flex'} flexDirection={'column'} align={'center'} bg={'white'} borderRadius={'10px'} p={'20px'} m={'20px'} boxShadow={'md'}>
            <Heading size='md'>{posts.length} Posts</Heading>
            <PostFeed posts={posts} ></PostFeed>
        </Container>
    );
};

ProfilePosts.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default ProfilePosts;
