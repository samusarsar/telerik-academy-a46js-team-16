import { useState } from "react";
import { users } from "../../../../data";
import PostDetails from '../../Posts/PostDetails/PostDetails';
import { useParams } from "react-router-dom";
import { Spacer, VStack } from "@chakra-ui/react";
import PostCommentsBox from "../../Posts/PostCommentsBox/PostCommentsBox";

const IndividualPost = ({ postID }) => {
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     setLoading(true);

    //     getPostByID({ postID })

    // })

    const [post, setPost] = useState(users[0].posts[0]);

    const { postTitle } = useParams();

    return (
        <VStack align='center' bg='brand.600' py={3}>
            <PostDetails post={post} />
            <Spacer />
            <PostCommentsBox comments={post.comments} />
        </VStack>
    );
};

export default IndividualPost;
