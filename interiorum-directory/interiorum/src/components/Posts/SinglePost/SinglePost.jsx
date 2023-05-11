import { Box, HStack, Heading, Text, AvatarGroup, Avatar, Spacer, Button, Icon } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext/AppContext';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import handleLikePost from '../../../common/helpers/handleLikePost';
import handleUnlikePost from '../../../common/helpers/handleUnlikePost';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { getUserByHandle } from '../../../services/users.service';
import DeleteButton from '../../Base/DeleteButton/DeleteButton';
import { deletePost } from '../../../services/post.service';
import { ADMIN_ROLE } from '../../../common/constants';


const SinglePost = ({ post, large = false }) => {
    const [likedUsers, setLikedUsers] = useState(null);
    const { userData } = useContext(AppContext);

    const [isLiked, setIsLiked] = useState(false);

    const body = post.content.length > 100 ? post.content.slice(0, 99) + '...' : post.content;

    useEffect(() => {
        return onValue(ref(db, `posts/${post.postId}/likes`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setIsLiked(userData ? Object.keys(data).includes(userData.handle) : false);
                Promise.all(Object.keys(data).map((handle) => getUserByHandle(handle)))
                    .then(resultArr => setLikedUsers(resultArr));
            } else {
                setIsLiked(false);
                setLikedUsers([]);
            }
        });
    }, []);

    if (likedUsers) {
        return (
            <Box textAlign='left' p={2} >
                <Heading as='h5' size='sm'><Link to={`../../post/${post.postId}`}>{post.title}</Link></Heading>

                {large && <Text fontSize='sm' my={3}>{body}</Text>}
                <HStack justify='right' py={2} flexWrap='wrap'>
                    <Text fontSize='0.8em'>Posted by <Link to={`../../profile/${post.author}`}><b>{post.author}</b></Link></Text>
                    <Text fontSize='0.8em' color='gray.500'>On {post.createdOn}</Text>
                    <Spacer />
                    <HStack>
                        {(likedUsers) &&
                            <Button h='25px' p={1} fontSize='0.8em' colorScheme={!isLiked ? 'blackAlpha' : 'telegram'} onClick={() => {
                                !isLiked ?
                                    handleLikePost({ postId: post.postId, handle: userData.handle }) :
                                    handleUnlikePost({ postId: post.postId, handle: userData.handle });
                            }}><Icon as={isLiked ? AiFillLike : AiOutlineLike} mr={1} />Like{likedUsers.length ? ` | ${likedUsers.length}` : ''}
                            </Button>}

                        {userData && (userData.handle === post.author || userData.role === ADMIN_ROLE) &&
                            <DeleteButton deleteType={'post'} deleteFunction={() => handleDeletePost(post.postId, userData.handle)} />
                        }

                        <AvatarGroup size='sm' max={3} fontSize='0.8em' spacing='-0.5rem' >
                            {likedUsers.length ?
                                likedUsers.map(user =>
                                    <Avatar
                                        key={user.uid}
                                        name={user.handle}
                                        src={user.avatarURL}
                                    />) :
                                <Text>No likes yet.</Text>}
                        </AvatarGroup>
                    </HStack>
                </HStack>
            </Box>
        );
    };

    return null;
};

export default SinglePost;
