import { Box, HStack, Heading, Text, AvatarGroup, Avatar, Spacer, Button, Icon } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext/AppContext';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import handleLikePost from '../../../common/helpers/handleLikePost';
import handleUnlikePost from '../../../common/helpers/handleUnlikePost';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';

const SinglePost = ({ post, large=false }) => {
    const [postLikes, setPostLikes] = useState(null);
    const { userData } = useContext(AppContext);

    const [isLiked, setIsLiked] = useState(
        userData.likedPosts ?
            Object.keys(userData.likedPosts).includes(post.postId) :
            false,
    );

    const body = post.content.length > 100 ? post.content.slice(0,99) + '...' : post.content;

    useEffect(() => {
        onValue(ref(db, `posts/${post.postId}/likes`), (snapshot) => {
            const data = snapshot.val();
            setPostLikes(data ? Object.keys(data) : []);
            setIsLiked(data ? Object.keys(data).includes(userData.handle) : false);
        });
    }, []);

    if (post) {
        return (
            <Box textAlign='left' p={2} >
                <Heading as='h5' size='sm'><Link to={`../../post/${post.postId}`}>{post.title}</Link></Heading>

                {large && <Text fontSize='sm' my={3}>{body}</Text>}
                <HStack justify='left' py={2}>
                    <Text fontSize='0.8em'>Posted by <Link to={`../../profile/${post.author}`}><b>{post.author}</b></Link></Text>
                    <Text fontSize='0.8em' color='gray.500'>On {post.createdOn}</Text>
                    <Spacer/>
                    {(postLikes) &&
                            <Button h='25px' p={1} fontSize='0.8em' colorScheme={!isLiked ? 'blackAlpha' : 'telegram'} onClick={() => {
                                !isLiked ?
                                    handleLikePost({ postId: post.postId, handle: userData.handle }) :
                                    handleUnlikePost({ postId: post.postId, handle: userData.handle });
                            }}><Icon as={isLiked ? AiFillLike : AiOutlineLike} mr={1} />Like{postLikes.length ? ` | ${postLikes.length}` : ''}
                            </Button>}
                    <AvatarGroup size='sm' max={3} fontSize='0.8em' spacing='-0.5rem' >
                        <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                        <Avatar name='Segun Adebayo' src='https://bit.ly/code-beast' />
                        <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                        <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
                        <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
                    </AvatarGroup>
                </HStack>
            </Box>
        );
    };

    return null;
};

export default SinglePost;
