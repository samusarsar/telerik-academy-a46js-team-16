import { Spacer, Text, VStack } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import FeaturedComment from '../../Comments/FeaturedComment/FeaturedComment';
import CommentFeed from '../../Comments/CommentFeed/CommentFeed';
import CreateComment from '../../Comments/CreateComment/CreateComment';
import { getCommentsByPost, getFeaturedComment } from '../../../services/comment.services';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import { BLOCKED_ROLE } from '../../../common/constants';
import BlockedAlert from '../../Base/BlockedAlert/BlockedAlert';
import { AppContext } from '../../../context/AppContext/AppContext';

import PropTypes from 'prop-types';

const PostCommentsBox = ({ postId }) => {
    const { userData } = useContext(AppContext);

    const [featured, setFeatured] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        return onValue(ref(db, `comments`), () => {
            getCommentsByPost(postId)
                .then(result => {
                    setComments(result);
                    setFeatured(getFeaturedComment(result));
                })
                .catch(() => {
                    setComments([]);
                    setFeatured(null);
                });
        });
    }, []);

    return (
        <VStack w={{ sm: '100%', md: '80%' }} align='start' boxShadow='lg'>
            <VStack align='center' p={8} bg='brand.100' w='100%' rounded='md'>
                {(!comments.length || comments.some(comment => !comment.commentId)) ? (
                    <Text>No comments, yet! Be the first one to comment.</Text>
                ) : (
                    <>
                        <FeaturedComment comment={featured} />
                        <Spacer />
                        <CommentFeed comments={comments} />
                        <Spacer />
                    </>
                )}

                {(userData.role === BLOCKED_ROLE) ? (
                    <BlockedAlert text={'You are currently restricted to add comments'} />
                ) : (
                    <CreateComment postId={postId} />
                )}


            </VStack>
        </VStack>
    );
};

PostCommentsBox.propTypes = {
    postId: PropTypes.string.isRequired,
};

export default PostCommentsBox;
