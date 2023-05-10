import { Box, HStack, Heading, Text } from '@chakra-ui/react';


import { BLOCKED_ROLE } from '../../../common/constants';
import { useContext, useState } from 'react';
import { AppContext } from '../../../context/AppContext/AppContext';
import BlockedAlert from '../../Base/BlockedAlert/BlockedAlert';
import CreatePostHeader from './CreatePostHeader';

const ForumHeader = () => {

    const { userData } = useContext(AppContext);

    const [creating, setCreating] = useState(false);

    return (
        <Box
            p='80px 50px'
            w='100%'
            className='create-post-header'
            bgColor='brand.500'
            bg={!creating ?
                "url('https://firebasestorage.googleapis.com/v0/b/interiorum-6c515.appspot.com/o/assets%2Fmoderninteriordesign.jpg?alt=media&token=4d3f5144-ca70-47b1-ab21-e52c6204a03e')" :
                ''}
            bgPosition="center"
            opacity={!creating ? '70%' : '100%'}
            transition='0.1s ease-in'>
            <Heading m='10px auto' textAlign='center' color={!creating ? 'brand.500' : 'brand.600'}>What are you working on?</Heading>
            <Text m='10px auto' textAlign='center' color={!creating ? 'brand.500' : 'brand.600'}>Get help for your projects, share your finds, and show off your Before & After.</Text>

            <HStack w='100%' justify='center'>
                {(userData.role === BLOCKED_ROLE) ? (
                    <BlockedAlert text={'You are currently restricted to add posts'} />
                ) : (
                    <CreatePostHeader creating={creating} setCreating={setCreating} />
                )}
            </HStack>

        </Box>
    );
};

export default ForumHeader;
