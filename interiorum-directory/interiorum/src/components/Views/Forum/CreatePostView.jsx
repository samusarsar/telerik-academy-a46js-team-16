import { Textarea, Stack, Button, Checkbox, Collapse, useDisclosure, FormErrorMessage, Alert, AlertIcon, AlertTitle, FormControl, Box } from '@chakra-ui/react';
import { categories } from '../../../../data';
import { POST_CONTENT_MAX_LENGTH, POST_CONTENT_MIN_LENGTH } from '../../../common/constants';
import { useState } from 'react';

const CreatePostView = () => {

    const { isOpen, onToggle } = useDisclosure();

    const [postContentLength, setPostContentLength] = useState(true);

    const postContentLengthIsValid = (input) => {
        if ((input.value.length < POST_CONTENT_MIN_LENGTH || input.value.length > POST_CONTENT_MAX_LENGTH) && input.value.length > 0) {
            setPostContentLength(false);
        } else {
            setPostContentLength(true);
        }
    };

    return (
        <Box>
            <FormControl isInvalid={!postContentLength} >
                {!postContentLength ? (
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
            <Textarea onChange={e => postContentLengthIsValid(e.target)} bg="white" focusBorderColor='brand.400' size='lg' placeholder='Tell us the specific details here' />
            <Button onClick={onToggle} width='100%' marginTop='10px'>Select category</Button>
            <Collapse in={isOpen} animateOpacity>
                <Stack borderRadius='10px' padding='10px' margin='10px 0' bg='white'>
                    {categories.map(c => <Checkbox iconColor='brand.400' colorScheme='black' key={c}>{c}</Checkbox>)}
                </Stack>
                <Button width='100%'>Create</Button>

            </Collapse>
        </Box>
    );
};

export default CreatePostView;
