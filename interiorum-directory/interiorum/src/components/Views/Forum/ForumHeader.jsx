import { Box, Heading, Text } from '@chakra-ui/react';


import { BLOCKED_ROLE } from '../../../common/constants';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext/AppContext';
import BlockedAlert from '../../Base/BlockedAlert/BlockedAlert';
import CreatePostHeader from './CreatePostHeader';

const ForumHeader = () => {

    const { userData } = useContext(AppContext);

    return (
        <Box
            p='80px 50px'
            w='100%'
            className='create-post-header'
            bgImage="url('https://firebasestorage.googleapis.com/v0/b/interiorum-6c515.appspot.com/o/assets%2Fmoderninteriordesign.jpg?alt=media&token=4d3f5144-ca70-47b1-ab21-e52c6204a03e')"
            bgPosition="center"
            opacity='70%'>
            <Heading m='10px auto' textAlign='center'>What are you working on?</Heading>
            <Text m='10px auto' textAlign='center'>Get help for your projects, share your finds, and show off your Before & After.</Text>

            {(userData.role === BLOCKED_ROLE) ? (
                <BlockedAlert text={'You are currently restricted to add posts'} />
            ) : (
                <CreatePostHeader />
            )}

        </Box>
    );
};

export default ForumHeader;
