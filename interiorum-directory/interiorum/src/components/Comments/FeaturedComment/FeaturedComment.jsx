import { Box, Heading, VStack } from '@chakra-ui/react';
import SingleComment from '../SingleComment/SingleComment';

import PropTypes from 'prop-types';

const FeaturedComment = ({ comment }) => {
    return (
        <VStack align='start' w='80%' gap={3}>
            <Heading as='h3' size='md'>Featured Comment:</Heading>
            <Box bg='brand.600' w='100%' rounded='md'>
                <SingleComment key={comment.commentId} comment={comment} />
            </Box>
        </VStack>);
};

FeaturedComment.propTypes = {
    comment: PropTypes.shape({
        commentId: PropTypes.string.isRequired,
    }).isRequired,
};

export default FeaturedComment;
