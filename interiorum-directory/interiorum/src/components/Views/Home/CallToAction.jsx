import { Box, Button, Container, Flex, HStack, Heading, Spacer, Text, VStack } from '@chakra-ui/react';
import { BsFillPeopleFill, BsFillChatTextFill } from 'react-icons/bs';
import StatBox from './StatBox';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
    const navigate = useNavigate();

    return (
        <HStack
            minW={{ base: '90%', md: '80%', lg: '60%' }}
            minH='400px' bg='brand.100'
            justify='left'
            m={8}
            sx={{ background: 'linear-gradient(90deg, rgba(212,155,111,0.2) 0%, rgba(212,154,111,0.95) 70%, rgba(212,154,111,1) 100%), url(\'src/assets/images/home-interior.jpeg\')' }}
            bgPosition='center'
            bgSize='100%'>
            <Spacer />
            <VStack align='left' gap={2}>
                <StatBox heading='Total Users' text='321' icon={BsFillPeopleFill} />
                <StatBox heading='Total Posts' text='123234' icon={BsFillChatTextFill} />
            </VStack>
            <Spacer/>
            <Box pr={8} align='right'>
                <Heading as='h2' size='xl'>Join Interiorum <i>now</i>!</Heading>
                <Text fontSize='lg'>Start your interior design journey and turn your home into an artwork</Text>
                <Text fontSize='lg'>and yourself into a true artist!</Text>
                <Button my={4} colorScheme='blackAlpha' alignSelf='end' onClick={() => navigate('../sign-up')}>Sign Up</Button>
            </Box>
        </HStack>
    );
};

export default CallToAction;
