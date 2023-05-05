import { Heading, Spacer, VStack } from "@chakra-ui/react";
import { useState } from "react";
import FeaturedComment from "../../Comments/FeaturedComment/FeaturedComment";
import CommentFeed from "../../Comments/CommentFeed/CommentFeed";

const PostCommentsBox = ({ comments }) => {
    const [featured, setFeatured] = useState(comments.sort((a, b) => a.likes > b.liked)[0]) // this will be with likes.length of Object.kyes() since likes will be an object

    return (
        <VStack w={{ sm: '100%', md: '80%' }} align='start' boxShadow='lg'>
            <VStack align='center' p={8} bg='brand.100' w='100%' rounded='md'>
                <FeaturedComment comment={featured} />
                <Spacer />
                <CommentFeed comments={comments} />
            </VStack>
        </VStack>
    );
};

export default PostCommentsBox;
