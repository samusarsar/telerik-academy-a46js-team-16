import { Box, Heading, VStack } from '@chakra-ui/react';
import SingleComment from '../SingleComment/SingleComment';

const FeaturedComment = ({ comment }) => {
    return (
        <VStack align='start' w='80%' gap={3}>
            <Heading as='h3' size='md'>Featured Comment:</Heading>
            <Box bg='brand.600' w='100%' rounded='md'>
                <SingleComment comment={comment} />
            </Box>
        </VStack>);
};

export default FeaturedComment;
