// eslint-disable-next-line max-len
import { Textarea, Stack, Button, Checkbox, Collapse, useDisclosure, FormErrorMessage, Alert, AlertIcon, AlertTitle, FormControl, Box, FormHelperText, HStack, FormLabel, VStack, Image, Text, Input, useToast, IconButton } from '@chakra-ui/react';
import { categories } from '../../../../data';
import { POST_CONTENT_MAX_LENGTH, POST_CONTENT_MIN_LENGTH } from '../../../common/constants';
import { addPost, uploadImagesForPost } from '../../../services/post.service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import PropTypes from 'prop-types';

const CreatePostBody = ({ postForm, setPostForm, updateForm, postTitleIsInvalid }) => {

    const [images, setImages] = useState(null);
    const [imagesError, setImagesError] = useState(null);

    const navigate = useNavigate();

    const { isOpen, onToggle } = useDisclosure();
    const toast = useToast();

    const contentTitleIsInvalid = ((postForm.content.length < POST_CONTENT_MIN_LENGTH || postForm.content.length > POST_CONTENT_MAX_LENGTH) && postForm.content.length > 0);

    const handleChoose = (e) => {
        const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        const currImage = e.target.files[0];
        const invalidImage = !acceptedImageTypes.includes(currImage.type);
        setImagesError(invalidImage);

        if (!invalidImage) {
            const currImages = images ? [...images] : [];
            currImages.push(currImage);

            setImages(currImages);
        }
    };

    const handleUpload = () => {
        setImagesError(false);
        uploadImagesForPost({ images })
            .then((imgURLs) =>
                setPostForm({
                    ...postForm,
                    imagesURL: imgURLs.join(' '),
                }))
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

    const handleClearImages = () => {
        setImages(null);
    };

    const handleCheckbox = e => {
        const postCategories = postForm.categories;
        const category = e.target.value;
        const indexOfCategory = postCategories.indexOf(category);
        if (indexOfCategory === -1) {
            postCategories.push(category);
        } else {
            postCategories.splice(indexOfCategory, 1);
        }

        setPostForm({
            ...postForm,
            categories: postCategories,
        });

    };

    const createPost = () => {
        addPost(postForm.title, postForm.content, postForm.categories, postForm.author, postForm.imagesURL)
            .then(postId => navigate(`/post/${postId}`))
            .catch(() => toast({
                title: 'Error creating post.',
                description: 'Please try again later!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'subtle',
            }));
    };

    return (
        <Box>
            {contentTitleIsInvalid &&
                <FormHelperText m='0' >
                    <Alert status='info'>
                        <AlertIcon />
                        <AlertTitle>Post content should be between {POST_CONTENT_MIN_LENGTH} and {POST_CONTENT_MAX_LENGTH} symbols</AlertTitle>
                    </Alert>
                </FormHelperText>}
            <Textarea onChange={updateForm('content')} bg="white" focusBorderColor='brand.400' size='lg' placeholder='Tell us the specific details here' />
            <HStack>
                <VStack p={6} align='start'>
                    <FormControl isInvalid={imagesError}>
                        <FormErrorMessage>Images should have valid names and be in still image format.</FormErrorMessage>
                        <Button as={FormLabel} colorScheme='whiteAlpha' mt={2}>
                            Choose Images
                        </Button>
                        <Input type='file' display='none' onChange={handleChoose} />
                        <IconButton icon={<AiOutlineClose />} size='sm' colorScheme='whiteAlpha' onClick={handleClearImages}></IconButton>
                    </FormControl>
                    <Button isDisabled={!images} onClick={handleUpload} colorScheme='green'>
                        Upload Images
                    </Button>
                </VStack>
                <HStack flexWrap='wrap' justify='center' h='fit-content' p={5}>
                    {images ?
                        images.map(img => <Image key={img.name} mt={4} boxSize='150px' objectFit='cover' src={URL.createObjectURL(img)} />) :
                        <Text color='brand.600'><i>No images selected for upload.</i></Text>}
                </HStack>
            </HStack>
            <Button onClick={onToggle} w='100%'>Select category</Button>
            <Collapse in={isOpen} animateOpacity>
                <Stack borderRadius='10px' padding='10px' margin='10px 0' bg='white'>
                    <FormControl isInvalid={postForm.categories.length === 0}>
                        {postForm.categories.length === 0 ? (

                            <FormHelperText m='0'>
                                <Alert status='info'>
                                    <AlertIcon />
                                    <AlertTitle>Please select at least one category</AlertTitle>
                                </Alert>

                            </FormHelperText>
                        ) : (
                            <></>
                        )}

                    </FormControl>
                    {Object.keys(categories).map(category => {
                        if (category !== 'allCategories') {
                            return <Checkbox onChange={handleCheckbox} value={category} iconColor='brand.400' colorScheme='black' key={category}>{categories[category]}</Checkbox>;
                        };
                        return null;
                    })}
                </Stack>

                <Button width='100%' isDisabled={
                    !postForm.title ||
                        !postForm.content ||
                        postForm.categories.length === 0 ||
                        postTitleIsInvalid ||
                        contentTitleIsInvalid ||
                        (images && !postForm.imagesURL)} onClick={createPost}>Create</Button>

            </Collapse>
        </Box>
    );
};

CreatePostBody.propTypes = {
    postForm: PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        categories: PropTypes.arrayOf(PropTypes.string).isRequired,
        author: PropTypes.string.isRequired,
        imagesURL: PropTypes.string.isRequired,
    }),
    setPostForm: PropTypes.func.isRequired,
    updateForm: PropTypes.func.isRequired,
    postTitleIsInvalid: PropTypes.bool.isRequired,
};
export default CreatePostBody;
