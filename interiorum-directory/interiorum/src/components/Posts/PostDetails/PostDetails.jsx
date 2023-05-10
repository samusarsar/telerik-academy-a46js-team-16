import { Badge, Button, ButtonGroup, Divider, HStack, Heading, Icon, Image, Spacer, Stack, Text, VStack } from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import DeleteButton from '../../Base/DeleteButton/DeleteButton';
import handleDeletePost from '../../../common/helpers/handleDeletePost';
import ContentEdit from '../../Views/IndividualPost/ContentEdit/ContentEdit';
import { ADMIN_ROLE } from '../../../common/constants';

const PostDetails = ({ post }) => {
    const [author, setAuthor] = useState(null);
    const [postLikes, setPostLikes] = useState(null);
    const [currPost, setCurrPost] = useState(post);

    const { userData } = useContext(AppContext);

    const navigate = useNavigate();

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        getUserByHandle(post.author)
            .then(data => setAuthor(data))
            .catch(error => console.log('Fetching author data was unsuccessful: ' + error.message));

        return onValue(ref(db, `posts/${post.postId}`), (snapshot) => {
            const data = snapshot.val();
            setCurrPost(data);
            setPostLikes(data.likes ? Object.keys(data.likes) : []);
            setIsLiked(data.likes ? Object.keys(data.likes).includes(userData.handle) : false);
        });
    }, []);

    const handleDeleteButton = () => {
        handleDeletePost(post.postId, userData.handle);
        navigate(-1);
    };

    return (
        <>
            <VStack p={8} bg='brand.100' rounded='md' w={{ sm: '100%', md: '80%' }} boxShadow='lg'>
                <HStack w='100%' align='start' justify='left'>
                    <Image
                        src={author && author.avatarURL}
                        fallbackSrc='https://firebasestorage.googleapis.com/v0/b/interiorum-6c515.appspot.com/o/assets%2Fanon-user.jpg?alt=media&token=0007d79f-52fb-4866-9747-326d52395bd9'
                        w='70px'
                        rounded='full'
                        mx={2} />
                    <VStack align='start' w='80%'>
                        <VStack align='start' w='100%'>
                            <HStack>
                                {currPost.categories && currPost.categories.map(category => <Link key={category} to={`/forum/${category}`}><Badge>{category}</Badge></Link>)}
                            </HStack>
                            <HStack>
                                <Heading as='h1' size='lg' fontWeight='500' w='100%'>{currPost.title}</Heading>
                                {post.author === userData.handle && <ContentEdit toEdit={currPost} />}
                            </HStack>
                            <HStack>
                                <Link to={`../../profile/${currPost.author}`}><b>{currPost.author}</b></Link>
                                <Text>| Published: {currPost.createdOn}</Text>
                                {currPost.lastEdited && <Text color='gray'>| Last modified: {currPost.lastEdited}</Text>}
                            </HStack>
                            <Divider w='100%' />
                        </VStack>
                        <VStack align='start' p={5} gap={5} bg='brand.600' w='100%' rounded='md'>
                            <Text>
                                {currPost.content}
                            </Text>
                            {currPost.imagesURL &&
                            <>
                                <Divider borderColor='brand.200' />
                                <HStack w='100%' flexWrap='wrap' justify='center' gap={3}>
                                    {currPost.imagesURL.split(' ').map(url => <Image key={url} src={url} boxSize='200px' />)}
                                </HStack>
                            </>}
                        </VStack>
                        {(postLikes) && <ButtonGroup w='100%'>
                            <Button h='30px' fontSize='0.8em' colorScheme={!isLiked ? 'gray' : 'telegram'} onClick={() => {
                                !isLiked ?
                                    handleLikePost({ postId: currPost.postId, handle: userData.handle }) :
                                    handleUnlikePost({ postId: currPost.postId, handle: userData.handle });
                            }}>
                                <Icon as={isLiked ? AiFillLike : AiOutlineLike} mr={1} />Like{postLikes.length ? ` | ${postLikes.length}` : ''}
                            </Button>
                            <Button h='30px' fontSize='0.8em' colorScheme='gray'><Icon as={FaRegComment} mr={1} />Comment</Button>
                            <Button h='30px' fontSize='0.8em' colorScheme='teal'><Icon as={FiShare} mr={2} />Share</Button>
                            <Spacer />
                            {userData && (userData.handle === currPost.author || userData.role === ADMIN_ROLE) &&
                                <DeleteButton deleteType={'post'} deleteFunction={handleDeleteButton} />
                            }
                        </ButtonGroup>}
                    </VStack>
                </HStack>
            </VStack>
        </>
    );
};

export default PostDetails;
