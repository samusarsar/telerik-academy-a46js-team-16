import { Box, Divider } from '@chakra-ui/react';
import SinglePost from '../SinglePost/SinglePost';

const PostFeed = ({ posts }) => {
    return (
        <Box py={4}>
            {posts.map(post =>
                <>
                    <SinglePost key={post.id} post={post} />
                    <Divider borderColor='gray.400' w='95%'/>
                </>,
            )}
        </Box>
    );
};

export default PostFeed;
