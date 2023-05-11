import { Box, Divider, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import SingleComment from '../SingleComment/SingleComment';

import PropTypes from 'prop-types';

const CommentFeed = ({ comments }) => {
    return (
        <VStack align='start' w='80%' gap={3}>
            <Heading as='h3' size='md'>Comments:</Heading>
            <Box bg='brand.600' w='100%' rounded='md'>
                {comments.length ?
                    comments.map(c => {
                        return (
                            <>
                                <SingleComment key={c.commentId} comment={c} />
                                <HStack px={6}>
                                    <Divider />
                                </HStack>
                            </>);
                    }) :
                    <Text>There are no comments on here yet. Be the first to respond!</Text>}
            </Box>
        </VStack>
    );
};

CommentFeed.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape({
        commentId: PropTypes.string.isRequired,
    })).isRequired,
};

export default CommentFeed;
