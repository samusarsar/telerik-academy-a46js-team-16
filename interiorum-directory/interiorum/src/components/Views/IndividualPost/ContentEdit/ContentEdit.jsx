/* eslint-disable max-len */
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    Button,
    useDisclosure,
    Icon,
    FormControl,
    FormLabel,
    FormErrorMessage,
    useToast,
    Image,
    Text,
    VStack,
    ButtonGroup,
    Textarea,
    HStack,
    IconButton,
} from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';
import { useState } from 'react';
import { POST_CONTENT_MAX_LENGTH, POST_CONTENT_MIN_LENGTH, POST_TITLE_MAX_LENGTH, POST_TITLE_MIN_LENGTH } from '../../../../common/constants';
import { deleteImagesForPost, editPost } from '../../../../services/post.service';
import { editComment } from '../../../../services/comment.services';
import { uploadImagesForPost } from '../../../../services/post.service.js';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';


const ContentEdit = ({ toEdit, commentMode = false }) => {
    const [title, setTitle] = useState(toEdit.title);
    const [titleError, setTitleError] = useState(false);
    const [content, setContent] = useState(toEdit.content);
    const [contentError, setContentError] = useState(false);

    const [images, setImages] = useState(null);
    const [imagesURL, setImagesURL] = useState(null);
    const [imageError, setImageError] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast();

    const handleChoose = (e) => {
        const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        const currImage = e.target.files[0];
        const invalidImage = !acceptedImageTypes.includes(currImage.type) ||
            currImage.name.includes(' ') ||
            currImage.name.includes('?');
        setImageError(invalidImage);

        if (!invalidImage) {
            const currImages = images ? [...images] : [];
            currImages.push(currImage);

            setImages(currImages);
        }
    };

    const handleUpload = () => {
        setImageError(false);
        uploadImagesForPost({ images })
            .then((imgURLs) =>
                setImagesURL(imgURLs.join(' ')))
            .then(() =>
                toast({
                    title: 'Upload successful',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                    variant: 'subtle',
                }),
            )
            .catch(() => toast({
                title: `Error uploading images`,
                description: 'Please try again later!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'subtle',
            }));
    };

    const handleDeleteImages = () => {
        const allURLs = toEdit.imagesURL.split(' ');
        const imageNames = allURLs.map(url => url.split('%2F')[2].split('?')[0]);
        deleteImagesForPost({ postId: toEdit.postId, imageNames });
    };

    const handleClearImages = () => {
        setImages(null);
        setImageError(false);
    };

    const handleEdit = () => {
        if (!commentMode) {
            const postTitleIsInvalid = ((title.length < POST_TITLE_MIN_LENGTH || title.length > POST_TITLE_MAX_LENGTH) && title.length > 0);
            const postContentIsInvalid = ((content.length < POST_CONTENT_MIN_LENGTH || content.length > POST_CONTENT_MAX_LENGTH) && content.length > 0);

            if (postTitleIsInvalid || postContentIsInvalid) {
                setTitleError(postTitleIsInvalid);
                setContentError(postContentIsInvalid);
                return;
            }
        } else {
            const commentIsInvalid = (content.length < 1 || content.length > 1000);

            if (commentIsInvalid) {
                setContentError(commentIsInvalid);
                return;
            }
        }

        setTitleError(false);
        setContentError(false);

        let allImageURL;

        if (imagesURL) {
            if (toEdit.imagesURL) {
                allImageURL = toEdit.imagesURL.split(' ').concat(imagesURL.split(' ')).join(' ');
            } else {
                allImageURL = imagesURL;
            }
        }

        try {
            !commentMode ?
                editPost({ postId: toEdit.postId, title, content, imagesURL: allImageURL }) :
                editComment({ commentId: toEdit.commentId, content });

            onClose();
            toast({
                title: 'Edit successful',
                description: `You have successfully edited your ${!commentMode ? 'post' : 'comment'}`,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'subtle',
            });
            setImages(null);
            setImagesURL(null);
        } catch (error) {
            toast({
                title: `Error editing ${!commentMode ? 'post' : 'comment'}`,
                description: 'Please try again later!',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'subtle',
            });
        }
    };

    return (
        <>
            <Icon as={MdEdit} onClick={onOpen} _hover={{ cursor: 'pointer' }} />
            <Drawer
                isOpen={isOpen}
                placement='right'
                size={!commentMode ? 'lg' : 'md'}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Edit your {!commentMode ? 'post' : 'comment'}</DrawerHeader>

                    <DrawerBody display='flex' flexDirection='column' gap={4}>
                        {!commentMode ?
                            (<>
                                <FormControl isInvalid={titleError}>
                                    <FormLabel>Title</FormLabel>
                                    <Input type='text' defaultValue={toEdit.title} onChange={(e) => setTitle(e.target.value)} bg='brand.600' color='brand.500' />
                                    <FormErrorMessage>Title should be between 16 and 64 characters.</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={contentError}>
                                    <FormLabel>Content</FormLabel>
                                    <Textarea type='text' defaultValue={toEdit.content} onChange={(e) => setContent(e.target.value)} bg='brand.600' color='brand.500' />
                                    <FormErrorMessage>Content should be between 32 and 8192 characters.</FormErrorMessage>
                                </FormControl>
                                <VStack align='start'>
                                    <VStack align='start'>
                                        <Text >Current Attachments:</Text>
                                        <HStack>
                                            {toEdit.imagesURL && toEdit.imagesURL.split(' ').map(img => <Image key={img} mt={4} boxSize='150px' objectFit='cover' src={img} />)}
                                        </HStack>
                                        <Button isDisabled={!toEdit.imagesURL} colorScheme='blackAlpha' onClick={handleDeleteImages}>
                                            Delete Images
                                        </Button>
                                    </VStack>
                                    <VStack align='start'>
                                        <Text >New Attachments:</Text>
                                        <HStack flexWrap='wrap'>
                                            {images && images.map(img => <Image key={img.name} mt={4} boxSize='150px' objectFit='cover' src={URL.createObjectURL(img)} />)}
                                        </HStack>
                                        <HStack>
                                            <FormControl isInvalid={imageError}>
                                                <Button as={FormLabel} colorScheme='blackAlpha'>
                                                    Choose Images
                                                </Button>
                                                <HStack>
                                                    <Button isDisabled={!images} colorScheme='teal' onClick={handleUpload}>
                                                        Upload Images
                                                    </Button>
                                                    <IconButton icon={<AiOutlineClose />} size='sm' colorScheme='blackAlpha' onClick={handleClearImages}></IconButton>
                                                </HStack>
                                                <Input type='file' display='none' onChange={handleChoose} />
                                                <FormErrorMessage>Images should have valid names and be in still image format.</FormErrorMessage>
                                            </FormControl>
                                        </HStack>
                                    </VStack>
                                </VStack>
                            </>) : (
                                <>
                                    <FormControl isInvalid={contentError}>
                                        <FormLabel>Comment</FormLabel>
                                        <Textarea type='text' defaultValue={toEdit.content} onChange={(e) => setContent(e.target.value)} bg='brand.600' color='brand.500' />
                                        <FormErrorMessage>Content should be between 1 and 1000 characters.</FormErrorMessage>
                                    </FormControl>
                                </>
                            )}
                    </DrawerBody>

                    <DrawerFooter>
                        <VStack align='end'>
                            {(images && !imagesURL) && <Text fontSize='0.8em'>You have to upload your new attachments before saving changes.</Text>}
                            <ButtonGroup spacing={0}>
                                <Button variant='outline' mr={3} onClick={onClose}>Cancel</Button>
                                <Button colorScheme='orange' isDisabled={images && !imagesURL} onClick={() => handleEdit(commentMode)}>Save</Button>
                            </ButtonGroup>
                        </VStack>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

ContentEdit.propTypes = {
    toEdit: PropTypes.shape({
        title: PropTypes.string,
        content: PropTypes.string,
        imagesURL: PropTypes.string,
        postId: PropTypes.string,
        commentId: PropTypes.string,
    }).isRequired,
    commentMode: PropTypes.bool,
};
export default ContentEdit;
