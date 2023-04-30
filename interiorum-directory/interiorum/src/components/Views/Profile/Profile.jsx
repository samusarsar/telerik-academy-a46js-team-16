import { Box, Container, Text, Image, Spacer, HStack, ButtonGroup, Button, Tabs, TabList, Tab, TabPanels, TabPanel, Flex, IconButton, Icon } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { users } from '../../../../data';
import ProfilePosts from './ProfilePosts';
import ProfileComments from './ProfileComments';
import { FiShare } from 'react-icons/fi';
import { TbMessageCircle } from 'react-icons/tb';
import { AuthContext } from '../../../AuthContext/AuthContext';

const Profile = () => {
    const userLogged = useContext(AuthContext);

    const [user, setUser] = useState(users[0]);
    const [posts, setPosts] = useState(users[0].posts);
    const [comments, setComments] = useState(users[0].comments);

    // useEffect(() => {
    //     fetch()
    //     .then(response => response.json())
    //     .then(data => {
    //         setPosts(data.posts);
    //         setComments(data.comments));
    // })

    return (
        <Container className='main-view' id='profile-view' maxW='container' minH='90vh' p={0}>
            <Container maxW='container' bg='brand.100'>
                <HStack justify='left' p={8} >
                    <Image
                        boxSize='150px'
                        objectFit='cover'
                        src='https://bit.ly/dan-abramov'
                        alt='Dan Abramov'
                    />
                    <Box px={4}>
                        <Text fontSize='1.8em' fontWeight='700'>{`${user.firstName} ${user.lastName}`}</Text>
                        <Text fontSize='0.9em' >{user.posts.length} posts | {user.comments.length} comments</Text>
                    </Box>
                    <Spacer />
                    <ButtonGroup variant='solid' spacing='4' size='md'>
                        <Button colorScheme='teal'><Icon as={FiShare} mr={2}/>Share</Button>
                        <Button colorScheme='facebook' ><Icon as={TbMessageCircle} mr={2}/>Message</Button>
                        {userLogged.isLoggedIn && <Button colorScheme='red' variant='outline' onClick={() => userLogged.setLoginState(false)}>Log Out</Button>}
                    </ButtonGroup>
                </HStack>
            </Container>
            <Tabs pl={12} pr={12} mt={2}>
                <TabList>
                    <Tab>Activity</Tab>
                    <Tab>Liked</Tab>
                    <Tab>Saved</Tab>
                </TabList>
                <TabPanels bg='brand.600'>
                    <TabPanel>
                        <Flex w='container' p={4} justify={'center'}>
                            <ProfilePosts posts={posts} />
                            <ProfileComments comments={comments} />
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex w='container' p={4} justify={'center'}>
                            <ProfilePosts posts={posts} />
                            <ProfileComments comments={comments} />
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex w='container' p={4} justify={'center'}>
                            <ProfilePosts posts={posts} />
                            <ProfileComments comments={comments} />
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
};

export default Profile;
