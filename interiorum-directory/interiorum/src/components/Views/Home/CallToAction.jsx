/* eslint-disable max-len */
import { Box, Button, HStack, Heading, Spacer, Text, VStack } from '@chakra-ui/react';
import { BsFillPeopleFill, BsFillChatTextFill } from 'react-icons/bs';
import StatBox from './StatBox';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../../services/users.service';
import { getPosts } from '../../../services/post.service';

const CallToAction = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers()
            .then(data => setUsers(Object.values(data)));

        getPosts()
            .then(data => setPosts(Object.values(data)));
    }, []);

    return (
        <HStack
            minW={{ base: '90%', md: '80%', lg: '70%' }}
            minH='400px' bg='brand.100'
            justify='left'
            m={8}
            background="linear-gradient(90deg, rgba(2, 24, 37, 0.2) 0%, rgba(2, 24, 37, 0.8) 50%, rgba(2, 24, 37, 1) 100%),
                url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80')"
            bgPosition='center'
            bgSize='100%'>
            <Spacer />
            <VStack align='left' gap={2}>
                {users && <StatBox heading='Total Users' text={users.length} icon={BsFillPeopleFill} />}
                {posts && <StatBox heading='Total Posts' text={posts.length} icon={BsFillChatTextFill} />}
            </VStack>
            <Spacer/>
            <Spacer />
            <Box pr={8} align='right' color='brand.600' maxW='40%'>
                <Heading as='h2' size='xl'>Join Interiorum <i>now</i>!</Heading>
                <Text fontSize='lg'>Start your interior design journey and turn your home into an artwork and yourself into a true artist!</Text>
                <Button my={4} bg='brand.200' color='brand.500' alignSelf='end'
                    _hover={{ bg: 'brand.600', color: 'brand.500' }}
                    onClick={() => navigate('../sign-up')}>Sign Up</Button>
            </Box>
            <Spacer />
        </HStack>
    );
};

export default CallToAction;
