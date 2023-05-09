import { Textarea, Stack, Button, Checkbox, Collapse, useDisclosure, FormErrorMessage, Alert, AlertIcon, AlertTitle, FormControl, Box } from '@chakra-ui/react';
import { categories } from '../../../../data';
import { POST_CONTENT_MAX_LENGTH, POST_CONTENT_MIN_LENGTH } from '../../../common/constants';
import { addPost } from '../../../services/post.service';
import { useNavigate } from 'react-router-dom';

const CreatePostBody = ({ postForm, setPostForm, updateForm, postTitleIsInvalid }) => {

    const navigate = useNavigate();

    const { isOpen, onToggle } = useDisclosure();

    const contentTitleIsInvalid = ((postForm.content.length < POST_CONTENT_MIN_LENGTH || postForm.content.length > POST_CONTENT_MAX_LENGTH) && postForm.content.length > 0);

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

    const createPost = (postForm) => {
        addPost(postForm.title, postForm.content, postForm.categories, postForm.author);
        navigate('/forum'); // TODO
    };

    return (
        <Box>
            <FormControl isInvalid={contentTitleIsInvalid} >
                {contentTitleIsInvalid ? (
                    <FormErrorMessage color='red' opacity="90%" backgroundColor={'white'} m='0'>
                        <Alert status='error'>
                            <AlertIcon />
                            <AlertTitle>Post content should be between {POST_CONTENT_MIN_LENGTH} and {POST_CONTENT_MAX_LENGTH} symbols</AlertTitle>
                        </Alert>
                    </FormErrorMessage>
                ) : (
                    <></>
                )}
            </FormControl>

            <Textarea onChange={updateForm('content')} bg="white" focusBorderColor='brand.400' size='lg' placeholder='Tell us the specific details here' />
            <Button onClick={onToggle} isDisabled={contentTitleIsInvalid || postTitleIsInvalid} width='100%' marginTop='10px'>Select category</Button>
            <Collapse in={isOpen} animateOpacity>
                <Stack borderRadius='10px' padding='10px' margin='10px 0' bg='white'>
                    <FormControl isInvalid={postForm.categories.length === 0}>
                        {postForm.categories.length === 0 ? (

                            <FormErrorMessage color='red' opacity="90%" backgroundColor={'white'} m='0'>
                                <Alert status='error'>
                                    <AlertIcon />
                                    <AlertTitle>Please select at least one category</AlertTitle>
                                </Alert>

                            </FormErrorMessage>
                        ) : (
                            <></>
                        )}

                    </FormControl>
                    {Object.keys(categories).map(category => {
                        if (category !== 'allCategories') return <Checkbox onChange={handleCheckbox} value={category} iconColor='brand.400' colorScheme='black' key={category}>{categories[category]}</Checkbox>
                    })}
                </Stack>

                <Button width='100%' isDisabled={postForm.categories.length === 0} onClick={() => createPost(postForm)}>Create</Button>

            </Collapse>
        </Box>
    );
};

export default CreatePostBody;
