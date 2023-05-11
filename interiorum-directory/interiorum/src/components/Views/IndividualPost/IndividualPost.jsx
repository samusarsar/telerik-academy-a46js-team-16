import { useEffect, useState } from 'react';
import PostDetails from '../../Posts/PostDetails/PostDetails';
import { useParams } from 'react-router-dom';
import { Spacer, VStack } from '@chakra-ui/react';
import PostCommentsBox from '../../Posts/PostCommentsBox/PostCommentsBox';
import { getPostById } from '../../../services/post.service';

const IndividualPost = () => {

    const [post, setPost] = useState(null);

    const { postId } = useParams();

    useEffect(() => {
        getPostById(postId)
            .then(result => setPost(result));
    }, []);

    if (post) {
        return (
            <VStack align='center' bg='brand.600' py={3}>
                <PostDetails post={post} />
                <Spacer />
                <PostCommentsBox postId={post.postId} />
            </VStack>
        );
    }
};

export default IndividualPost;
