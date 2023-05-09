import { Alert, AlertIcon, AlertTitle, Box, Collapse, FormControl, FormErrorMessage, Input, InputGroup, useDisclosure } from '@chakra-ui/react';
import { POST_TITLE_MAX_LENGTH, POST_TITLE_MIN_LENGTH } from '../../../common/constants';
import { useContext, useState } from 'react';
import { AppContext } from '../../../context/AppContext/AppContext';
import CreatePostBody from './CreatePostBody';

const CreatePostHeader = () => {

    const { isOpen, onToggle } = useDisclosure();

    const { userData } = useContext(AppContext);

    const [postForm, setPostForm] = useState({
        title: '',
        content: '',
        categories: [],
        author: userData.handle,
    });

    const updateForm = prop => e => {
        setPostForm({
            ...postForm,
            [prop]: e.target.value,
        });
    };

    const postTitleIsInvalid = ((postForm.title.length < POST_TITLE_MIN_LENGTH || postForm.title.length > POST_TITLE_MAX_LENGTH) && postForm.title.length > 0);


    return (
        <InputGroup>
            <FormControl isInvalid={postTitleIsInvalid} >
                {postTitleIsInvalid ? (
                    <FormErrorMessage color='red' opacity="90%" backgroundColor={'white'} m='0'>
                        <Alert status='error'>
                            <AlertIcon />
                            <AlertTitle>Post title should be between {POST_TITLE_MIN_LENGTH} and {POST_TITLE_MAX_LENGTH} symbols</AlertTitle>
                        </Alert>

                    </FormErrorMessage>
                ) : (
                    <></>
                )
                }
                <Input
                    onChange={updateForm('title')}
                    m='0px 0px 10px'
                    bg='white'
                    onClick={onToggle}
                    focusBorderColor='brand.400'
                    placeholder='Enter your question' />

                <Collapse in={isOpen} animateOpacity>
                    <Box>
                        <CreatePostBody postForm={postForm} setPostForm={setPostForm} updateForm={updateForm} postTitleIsInvalid={postTitleIsInvalid} />
                    </Box>
                </Collapse>
            </FormControl>
        </InputGroup>
    );
};

export default CreatePostHeader;
