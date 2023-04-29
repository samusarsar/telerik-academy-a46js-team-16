import { Box, Collapse, useDisclosure, InputGroup, Input, InputRightAddon, Heading, Text, Center } from '@chakra-ui/react'

import CreatePostView from './CreatePostView';
import { POST_TITLE_MAX_LENGTH } from '../../../common/constants';

const CreatePostHeader = () => {

    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box p='80px 50px' w='100%' className='create-post-header' bgImage="url('src/assets/images/moderninteriordesign.jpg')" bgPosition="center" opacity='70%'>
            <Heading m='10px auto' textAlign='center'>What are you working on?</Heading>
            <Text m='10px auto' textAlign='center'>Get help for your projects, share your finds, and show off your Before & After.</Text>
            <InputGroup>
                <Input m='10px 0' bg='white' onClick={onToggle} focusBorderColor='brand.400' placeholder='Enter your question' />
                <InputRightAddon m='10px 0' children={POST_TITLE_MAX_LENGTH} />
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