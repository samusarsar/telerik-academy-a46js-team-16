import { useEffect, useState } from 'react';
import PostDetails from '../../Posts/PostDetails/PostDetails';
import { useParams } from 'react-router-dom';
import { Spacer, VStack } from '@chakra-ui/react';
import PostCommentsBox from '../../Posts/PostCommentsBox/PostCommentsBox';
import { getPostById } from '../../../services/post.service';

const IndividualPost = () => {

    // const [loading, setLoading] = useState(false);
    const [post, setPost] = useState([]);

    const { postId } = useParams();
    // console.log(postId);

    useEffect(() => {
        getPostById(postId)
            .then(result => {
                console.log(result);
                setPost(result);
            });
    }, []);


    return (
        <VStack align='center' bg='brand.600' py={3}>
            <PostDetails post={post} />
            <Spacer />
            {post.comments ? (
                <PostCommentsBox comments={post.comments} />
            ) : (
                <div>No Comments yet! Be the first one to comment</div> // TODO
            )}
        </VStack>
    );
};

export default IndividualPost;
