import { Box, Collapse, useDisclosure, InputGroup, Input, Heading, Text, FormControl, FormErrorMessage, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

import CreatePostView from './CreatePostView';
import { POST_TITLE_MAX_LENGTH, POST_TITLE_MIN_LENGTH } from '../../../common/constants';
import { useContext, useState } from 'react';
import { AppContext } from '../../../context/AppContext/AppContext';

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
        <Box p='80px 50px' w='100%' className='create-post-header' bgImage="url('src/assets/images/moderninteriordesign.jpg')" bgPosition="center" opacity='70%'>
            <Heading m='10px auto' textAlign='center'>What are you working on?</Heading>
            <Text m='10px auto' textAlign='center'>Get help for your projects, share your finds, and show off your Before & After.</Text>
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
                    )}
                    <Input
                        onChange={updateForm('title')}
                        m='0px 0px 10px'
                        bg='white'
                        onClick={onToggle}
                        focusBorderColor='brand.400'
                        placeholder='Enter your question' />
                </FormControl>
            </InputGroup>
            <Collapse in={isOpen} animateOpacity>
                <Box>
                    <CreatePostView postForm={postForm} setPostForm={setPostForm} updateForm={updateForm} postTitleIsInvalid={postTitleIsInvalid}/>
                </Box>
            </Collapse>
        </Box>
    );
};

export default CreatePostHeader;
