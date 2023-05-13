/* eslint-disable max-len */
import { Avatar, Badge, Button, ButtonGroup, Divider, FormControl, FormErrorMessage, HStack, Heading, Icon, Image, Input, Spacer, Tag, TagCloseButton, TagLabel, Text, VStack } from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { useContext, useEffect, useState } from 'react';
import { getUserByHandle } from '../../../services/users.service';
import { deletePost } from '../../../services/post.service';
import { AppContext } from '../../../context/AppContext/AppContext';
import handleLikePost from '../../../common/helpers/handleLikePost';
import handleUnlikePost from '../../../common/helpers/handleUnlikePost';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import DeleteButton from '../../Base/DeleteButton/DeleteButton';
import ContentEdit from '../../Views/IndividualPost/ContentEdit/ContentEdit';
import { ADMIN_ROLE } from '../../../common/constants';
import { addPostToTag, addTagToPost, removePostFromTag, removeTagFromPost } from '../../../services/tag.services';
import { categories } from '../../../../data';
import ShareButtons from '../../Base/ShareButtons/ShareButtons';

import PropTypes from 'prop-types';

const PostDetails = ({ post }) => {
    const [author, setAuthor] = useState(null);
    const [postLikes, setPostLikes] = useState(null);
    const [currPost, setCurrPost] = useState(post);

    const [newTag, setNewTag] = useState('');
    const [newTagError, setNewTagError] = useState('');

    const { userData } = useContext(AppContext);

    const navigate = useNavigate();

    const [isLiked, setIsLiked] = useState(false);

    const location = useLocation();

    useEffect(() => {
        getUserByHandle(post.author)
            .then(data => setAuthor(data));

        return onValue(ref(db, `posts/${post.postId}`), (snapshot) => {
            if (!snapshot.exists()) return;
            const data = snapshot.val();

            setCurrPost(data);
            setPostLikes(data.likes ? Object.keys(data.likes) : []);
            setIsLiked(data.likes ? Object.keys(data.likes).includes(userData.handle) : false);
        });
    }, []);

    const handleAddTag = () => {
        setNewTagError(newTag !== newTag.toLowerCase());

        if (newTag === newTag.toLowerCase()) {
            addPostToTag({ tag: newTag, postId: post.postId });
            addTagToPost({ tag: newTag, postId: post.postId });
            setNewTag('');
        }
    };

    const handleRemoveTag = (tag) => {
        removePostFromTag({ tag, postId: post.postId });
        removeTagFromPost({ tag, postId: post.postId });
    };

    const handleDeleteButton = () => {
        deletePost(post.postId, userData.handle)
            .then(() => navigate(-1));
    };

    return (
        <>
            <VStack p={8} bg='brand.100' rounded='md' w={{ sm: '100%', md: '80%' }} boxShadow='lg'>
                <HStack w='100%' align='start' justify='left'>
                    <Link to={`../../profile/${post.author}`} >
                        <Avatar
                            src={author && author.avatarURL}
                            name={author && `${author.firstName} ${author.lastName}`}
                            size='xl'
                            mx={2} />
                    </Link>
                    <VStack align='start' w='80%'>
                        <VStack align='start' w='100%' gap={2}>
                            <HStack>
                                {currPost.categories && currPost.categories.map(category => <Link key={category} to={`/forum/${category}`}><Badge>{categories[category]}</Badge></Link>)}
                            </HStack>
                            <HStack>
                                <Heading as='h1' size='lg' fontWeight='500' w='100%'>{currPost.title}</Heading>
                                {post.author === userData.handle && <ContentEdit toEdit={currPost} />}
                            </HStack>
                            <HStack w='100%'>
                                <HStack>
                                    {currPost.tags &&
                                    (Object.keys(currPost.tags).map(tag =>
                                        <Tag
                                            key={tag}
                                            size='md'
                                            borderRadius='full'
                                            variant='subtle'
                                            colorScheme='teal'
                                        >
                                            <TagLabel>{tag}</TagLabel>
                                            {(userData.role === ADMIN_ROLE || userData.handle === post.author) &&
                                            <TagCloseButton onClick={() => handleRemoveTag(tag)}/>}
                                        </Tag>))}
                                </HStack>
                                {(userData.role === ADMIN_ROLE || userData.handle === post.author) &&
                                <FormControl isInvalid={newTagError}>
                                    <Input type='text' placeholder='Add tag' h='25px' w='120px' border='brand.200' focusBorderColor='brand.100' color='gray'
                                        value={newTag} onChange={(e) => setNewTag(e.target.value)}
                                        onKeyDown={(e) => (e.key === 'Enter') ? handleAddTag() : null}/>
                                    <FormErrorMessage>Tags must be lowercase.</FormErrorMessage>
                                </FormControl>}
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
                                <VStack w='100%' align='center'>
                                    <HStack w='80%' flexWrap='wrap' justify='center' gap={3}>
                                        {currPost.imagesURL.split(' ').map(url => <Image key={url} src={url} objectFit='cover' />)}
                                    </HStack>
                                </VStack>
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
                            <ShareButtons location={location} text={post.author} />
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

PostDetails.propTypes = {
    post: PropTypes.shape({
        author: PropTypes.string.isRequired,
        categories: PropTypes.arrayOf(PropTypes.string),
        createdOn: PropTypes.string.isRequired,
        postId: PropTypes.string.isRequired,
        tags: PropTypes.objectOf(PropTypes.bool),
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export default PostDetails;
