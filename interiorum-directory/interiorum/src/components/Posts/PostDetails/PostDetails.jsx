import { Badge, Button, ButtonGroup, Divider, HStack, Heading, Icon, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiShare } from 'react-icons/fi';
import { useContext, useEffect, useState } from 'react';
import { addLikedPostToUser, getUserByHandle } from '../../../services/users.service';
import { addLikeToPost } from '../../../services/post.service';

import { AppContext } from '../../../context/AppContext/AppContext';
import handleLikePost from '../../../common/helpers/handleLikePost';
import handleUnlikePost from '../../../common/helpers/handleUnlikePost';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';

const PostDetails = ({ post }) => {
    const [author, setAuthor] = useState(null);
    const [postLikes, setPostLikes] = useState(null);

    const { userData } = useContext(AppContext);

    const [isLiked, setIsLiked] = useState(
        userData.likedPosts ?
            Object.keys(userData.likedPosts).includes(post.postId) :
            false
    );

    useEffect(() => {
        getUserByHandle(post.author)
            .then(snapshot => snapshot.val())
            .then(data => setAuthor(data))
            .catch(error => console.log('Fetching author data was unsuccessful: ' + error.message));

        onValue(ref(db, `posts/${post.postId}/likes`), (snapshot) => {
            const data = snapshot.val();
            setPostLikes(data ? Object.keys(data) : []);
            setIsLiked(data ? Object.keys(data).includes(userData.handle) : false);
        });
    }, []);

    return (
        <>
            <VStack p={8} bg='brand.100' rounded='md' w={{ sm: '100%', md: '80%' }} boxShadow='lg'>
                <HStack w='100%' align='start' justify='left'>
                    <Image
                        src={author && author.avatarURL}
                        fallbackSrc='https://firebasestorage.googleapis.com/v0/b/interiorum-6c515.appspot.com/o/assets%2Fanon-user.jpg?alt=media&token=0007d79f-52fb-4866-9747-326d52395bd9'
                        w='70px'
                        rounded='full'
                        mx={2}/>
                    <VStack align='start' w='80%'>
                        <VStack align='start' w='100%'>
                            <HStack>
                                {post.categories && post.categories.map(category => <Link key={category} to={`/forum/${category}`}><Badge>{category}</Badge></Link>)}
                            </HStack>
                            <Heading as='h1' size='lg' fontWeight='500' w='100%'>{post.title}</Heading>
                            <HStack>
                                <Link to={`../../profile/${post.author}`}>{post.author}</Link>
                                <Text>| {post.createdOn}</Text>
                            </HStack>
                            <Divider w='100%' />
                        </VStack>
                        <VStack align='start' p={5} gap={5} bg='brand.600' w='100%' rounded='md'>
                            <Text>
                                {post.content}
                            </Text>
                        </VStack>
                        {(postLikes) &&<ButtonGroup>
                            <Button h='30px' fontSize='0.8em' onClick={() => {
                                !isLiked ?
                                    handleLikePost({ postId: post.postId, handle: userData.handle }) :
                                    handleUnlikePost({ postId: post.postId, handle: userData.handle });
                            }}>
                                <Icon as={isLiked ? AiFillLike : AiOutlineLike} mr={1} />Like{postLikes.length ? ` | ${postLikes.length}` : ''}
                            </Button>
                            <Button h='30px' fontSize='0.8em'><Icon as={FaRegComment} mr={1} />Comment</Button>
                            <Button h='30px' fontSize='0.8em'><Icon as={FiShare} mr={2}/>Share</Button>
                        </ButtonGroup>}
                    </VStack>
                </HStack>
            </VStack>
        </>
    );
};

export default PostDetails;
