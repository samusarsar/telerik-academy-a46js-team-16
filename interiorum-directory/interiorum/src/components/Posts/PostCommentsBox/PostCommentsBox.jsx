import { Spacer, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import FeaturedComment from '../../Comments/FeaturedComment/FeaturedComment';
import CommentFeed from '../../Comments/CommentFeed/CommentFeed';
import CreateComment from '../../Comments/CreateComment/CreateComment';

const PostCommentsBox = ({ comments }) => {
    const [featured, setFeatured] = useState(comments.sort((a, b) => a.likes > b.liked)[0]) // this will be with likes.length of Object.kyes() since likes will be an object

    return (
        <VStack w={{ sm: '100%', md: '80%' }} align='start' boxShadow='lg'>
            <VStack align='center' p={8} bg='brand.100' w='100%' rounded='md'>
                {comments.length === 0 ? (
                    <Text>No comments, yet! Be the first one to comment.</Text>
                ) : (
                    <>
                        <FeaturedComment comment={featured} />
                        <Spacer />
                        <CommentFeed comments={comments} />
                        <Spacer />
                    </>
                )}

                <CreateComment />
            </VStack>
        </VStack>
    );
};

export default PostCommentsBox;
