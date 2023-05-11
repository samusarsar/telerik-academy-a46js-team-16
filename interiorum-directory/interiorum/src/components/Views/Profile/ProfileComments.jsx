import { Container, Heading } from '@chakra-ui/react';
import PostFeed from '../../Posts/PostFeed/PostFeed';
import PropTypes from 'prop-types';

const ProfileComments = ({ comments }) => {
    return (
        <Container display={'flex'} flexDirection={'column'} align={'center'} bg={'white'} borderRadius={'10px'} p={'20px'} m={'20px'} boxShadow={'md'}>
            <Heading size='md'>{comments.length} Comments</Heading>
            <PostFeed posts={comments} profileCommentMode={true} />
        </Container>
    );
};

ProfileComments.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProfileComments;
