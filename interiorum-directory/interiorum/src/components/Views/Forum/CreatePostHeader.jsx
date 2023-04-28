import { Box, Collapse, useDisclosure, InputGroup, Input, InputRightAddon } from '@chakra-ui/react'

import CreatePostView from './CreatePostView';
import { useState } from 'react';


const CreatePostHeader = () => {

    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box bg='#DBCCBD' w='100%' p='10px' className='create-post'>
            <h2>What are you working on?</h2>
            <p>Get help for your projects, share your finds, and show off your Before & After.</p>
            <InputGroup>
                <Input onClick={onToggle} placeholder='Enter your question' />
                <InputRightAddon children='70' />
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
