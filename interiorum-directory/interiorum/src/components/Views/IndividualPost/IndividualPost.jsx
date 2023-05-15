import { useEffect, useState } from 'react';
import PostDetails from '../../Posts/PostDetails/PostDetails';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Spacer, Spinner, VStack } from '@chakra-ui/react';
import PostCommentsBox from '../../Posts/PostCommentsBox/PostCommentsBox';
import { getPostById } from '../../../services/post.service';

const IndividualPost = () => {

    const [post, setPost] = useState(null);

    const { postId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getPostById(postId)
            .then(result => setPost(result))
            .catch(() => navigate('../../not-found'));
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

    return (
        <VStack align='center' bg='brand.600' py={3}>
            <Box p={8} bg='brand.100' rounded='md' w={{ sm: '100%', md: '80%' }} boxShadow='lg'>
                <VStack justify='center' h='200px'>
                    <Spinner size='xl' />
                </VStack>
            </Box>
        </VStack>
    );
};

export default IndividualPost;
