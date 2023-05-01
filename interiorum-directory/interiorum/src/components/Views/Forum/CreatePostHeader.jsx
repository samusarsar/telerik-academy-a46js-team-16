import { Box, Collapse, useDisclosure, InputGroup, Input, Heading, Text, FormControl, FormErrorMessage, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

import CreatePostView from './CreatePostView';
import { POST_TITLE_MAX_LENGTH, POST_TITLE_MIN_LENGTH } from '../../../common/constants';
import { useState } from 'react';

const CreatePostHeader = () => {

    const { isOpen, onToggle } = useDisclosure();

    const [postTitleLength, setPostTitleLength] = useState(true);

    const postTitleLengthIsValid = (input) => {
        if ((input.value.length < POST_TITLE_MIN_LENGTH || input.value.length > POST_TITLE_MAX_LENGTH) && input.value.length > 0) {
            setPostTitleLength(false);
        } else {
            setPostTitleLength(true);
        }
    };

    return (
        <Box p='80px 50px' w='100%' className='create-post-header' bgImage="url('src/assets/images/moderninteriordesign.jpg')" bgPosition="center" opacity='70%'>
            <Heading m='10px auto' textAlign='center'>What are you working on?</Heading>
            <Text m='10px auto' textAlign='center'>Get help for your projects, share your finds, and show off your Before & After.</Text>
            <InputGroup>
                <FormControl isInvalid={!postTitleLength} >
                    {!postTitleLength ? (

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
                        onChange={(e) => postTitleLengthIsValid(e.target)}
                        m='0px 0px 10px'
                        bg='white'
                        onClick={onToggle}
                        focusBorderColor='brand.400'
                        placeholder='Enter your question' />
                </FormControl>
            </InputGroup>
            <Collapse in={isOpen} animateOpacity>
                <Box>
                    <CreatePostView />
                </Box>
            </Collapse>
        </Box>
    );
};

export default CreatePostHeader;
