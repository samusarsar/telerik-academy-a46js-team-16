import { Avatar, Button, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { getUserByHandle } from '../../../services/users.service';
import { AppContext } from '../../../context/AppContext/AppContext';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import handleLikeComment from '../../../common/helpers/handleLikeComment';
import handleUnlikeComment from '../../../common/helpers/handleUnlikeComment';
import ContentEdit from '../../Views/IndividualPost/ContentEdit/ContentEdit';
import DeleteButton from '../../Base/DeleteButton/DeleteButton';
import { deleteComment } from '../../../services/comment.services';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ADMIN_ROLE } from '../../../common/constants';

const SingleComment = ({ comment }) => {
    const [author, setAuthor] = useState(null);
    const [commentLikes, setCommentLikes] = useState(null);
    const { userData } = useContext(AppContext);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        getUserByHandle(comment.author)
            .then(data => setAuthor(data));

        return onValue(ref(db, `comments/${comment.commentId}/likes`), (snapshot) => {
            const data = snapshot.val();
            setCommentLikes(data ? Object.keys(data) : []);
            setIsLiked(data ? Object.keys(data).includes(userData.handle) : false);
        });
    }, []);

    return (
        <HStack align='start' p={4} >
            <Link to={`../../profile/${comment.author}`}>
                <Avatar
                    src={author && author.avatarURL}
                    name={author && `${author.firstName} ${author.lastName}`}
                    rounded='full'
                    boxSize='45px'
                    objectFit='cover'
                    mx={2}/>
            </Link>
            <VStack align='start'>
                <Text fontSize='0.8em' fontWeight='700'><Link to={`../../profile/${comment.author}`}>{comment.author}</Link></Text>
                <Text fontSize='0.8em' color='gray.500'>{comment.createdOn}</Text>
                <HStack>
                    <Text>{comment.content}</Text>
                    {comment.author === userData.handle && <ContentEdit toEdit={comment} commentMode={true} />}
                </HStack>
                <HStack>
                    {(commentLikes) &&
                                <Button h='25px' p={1} fontSize='0.8em' colorScheme={!isLiked ? 'blackAlpha' : 'telegram'} onClick={() => {
                                    !isLiked ?
                                        handleLikeComment({ commentId: comment.commentId, handle: userData.handle }) :
                                        handleUnlikeComment({ commentId: comment.commentId, handle: userData.handle });
                                }}><Icon as={isLiked ? AiFillLike : AiOutlineLike} mr={1} />Like{commentLikes.length ? ` | ${commentLikes.length}` : ''}
                                </Button>}

                    {(userData.handle === comment.author || userData.role === ADMIN_ROLE) &&
                        <DeleteButton deleteType={'comment'} single={true} deleteFunction={() => deleteComment(userData.handle, comment.commentId)} />
                    }
                </HStack>
            </VStack>
        </HStack>
    );
};

SingleComment.propTypes = {
    comment: PropTypes.shape({
        author: PropTypes.string.isRequired,
        commentId: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        createdOn: PropTypes.string.isRequired,
    }).isRequired,
};

export default SingleComment;
