import { Box, Divider, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import SingleComment from "../SingleComment/SingleComment";
import CreateComment from "../CreateComment/CreateComment";

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
    )
};

export default CommentFeed;
