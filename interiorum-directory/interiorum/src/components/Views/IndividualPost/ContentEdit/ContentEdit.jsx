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
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Image,
    Text,
    VStack,
    ButtonGroup,
    Textarea,
} from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';
import { useState } from 'react';
import { POST_CONTENT_MAX_LENGTH, POST_CONTENT_MIN_LENGTH, POST_TITLE_MAX_LENGTH, POST_TITLE_MIN_LENGTH } from '../../../../common/constants';
import { editPost } from '../../../../services/post.service';
import { editComment } from '../../../../services/comment.services';

const ContentEdit = ({ toEdit, commentMode=false }) => {
    const [title, setTitle] = useState(toEdit.title);
    const [titleError, setTitleError] = useState(false);
    const [content, setContent] = useState(toEdit.content);
    const [contentError, setContentError] = useState(false);
    // const [images, setImages] = useState(toEdit.images);
    const [images, setImages] = useState([]);
    const [imagesError, setImagesError] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast();

    const handleChoose = (e) => {
        const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        const invalidImages = e.target.files.some(img => !acceptedImageTypes.includes(img.type));
        setImagesError(invalidImages);

        if (!invalidImages) {
            setImages(e.target.files);
            setImagesError(false);
        }
    };

    const handleUpload = () => {
        const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        const invalidImages = e.target.files.some(img => !acceptedImageTypes.includes(img.type));
        setImagesError(invalidImages);

        if (!invalidImages) {
            setImagesError(false);
            // uploadImages
        }
    };

    const handleEdit = (commentMode) => {
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
        !commentMode ?
            editPost({ postId: toEdit.postId, title, content, images }) :
            editComment({ commentId: toEdit.commentId, content })
                .then(() => {
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
                });
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
                                    <Input type='text' defaultValue={toEdit.content} onChange={(e) => setContent(e.target.value)} bg='brand.600' color='brand.500' />
                                    <FormErrorMessage>Content should be between 32 and 8192 characters.</FormErrorMessage>
                                </FormControl>
                            </>) : (
                                <>
                                    <FormControl isInvalid={contentError}>
                                        <FormLabel>Comment</FormLabel>
                                        <Textarea type='text' defaultValue={toEdit.content} onChange={(e) => setContent(e.target.value)} bg='brand.600' color='brand.500' />
                                        <FormErrorMessage>First name should be between 4 and 32 characters.</FormErrorMessage>
                                    </FormControl>
                                </>
                            )}
                        {/* <FormControl isInvalid={avatarError}>
                            <FormLabel htmlFor=''>Avatar</FormLabel>
                            <VStack justify='center' gap={2}>
                                {avatar && <Image mt={4} boxSize='150px' objectFit='center' src={URL.createObjectURL(avatar)} />}
                                <Text fontSize='0.8em'>{avatar ? avatar.name : 'No avatar uploaded.'}</Text>
                            </VStack>
                            <Menu>
                                <MenuButton
                                    mt={4}
                                    px={4}
                                    py={2}
                                    transition='all 0.2s'
                                    borderRadius='md'
                                    borderWidth='1px'
                                    _hover={{ bg: 'gray.400' }}
                                    _expanded={{ bg: 'blue.400' }}
                                    _focus={{ boxShadow: 'outline' }}
                                >
                                    File
                                </MenuButton>
                                <MenuList>
                                    <MenuItem><FormLabel>Choose File</FormLabel></MenuItem>
                                    <Input type='file' display='none' onChange={(e) => handleChoose(e)} />
                                    <MenuDivider />
                                    <MenuItem isDisabled={!avatar} onClick={handleUpload}>Upload Avatar</MenuItem>
                                    <MenuItem onClick={() => {
                                        setAvatar(null);
                                        setAvatarError(false);
                                    }}>Delete File</MenuItem>
                                </MenuList>
                            </Menu>
                            <FormErrorMessage>Avatar should be a still image format.</FormErrorMessage>
                        </FormControl> */}
                    </DrawerBody>

                    <DrawerFooter>
                        <VStack align='end'>
                            {/* {(avatar && !newAvatarURL) && <Text fontSize='0.8em'>You have to upload your new avatar before saving changes.</Text>} */}
                            <ButtonGroup spacing={0}>
                                <Button variant='outline' mr={3} onClick={onClose}>Cancel</Button>
                                <Button colorScheme='orange' onClick={() => handleEdit(commentMode)}>Save</Button>
                            </ButtonGroup>
                        </VStack>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default ContentEdit;
