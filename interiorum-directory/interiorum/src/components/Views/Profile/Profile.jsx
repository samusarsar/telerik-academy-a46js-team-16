import { Box, Container, Text, Image, Spacer, HStack, ButtonGroup, Button, Tabs, TabList, Tab, TabPanels, TabPanel, Flex, IconButton, Icon, useToast } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { users } from '../../../../data';
import ProfilePosts from './ProfilePosts';
import ProfileComments from './ProfileComments';
import { FiShare } from 'react-icons/fi';
import { TbMessageCircle } from 'react-icons/tb';
import { AppContext } from '../../../context/AppContext/AppContext';
import handleLogOut from '../../../common/helpers/handleLogOut';
import { useNavigate, useParams } from 'react-router-dom';
import EditDrawer from './EditDrawer';
import { onValue, ref } from 'firebase/database';
import { db, storage } from '../../../config/firebase-config';
import { MdSignalCellularNull } from 'react-icons/md';

const Profile = () => {
    const { user, userData, setContext } = useContext(AppContext);

    const { handle } = useParams();

    const [firstName, setFirstName] = useState(userData.firstName);
    const [lastName, setLastName] = useState(userData.secondName);
    const [avatarURL, setAvatarURL] = useState(userData.avatarURL || null);

    const [posts, setPosts] = useState(users[0].posts);
    const [comments, setComments] = useState(users[0].comments);

    const navigate = useNavigate();
    const toast = useToast();
    useEffect(() => {
        onValue(ref(db, `users/${userData.handle}`), (snapshot) => {
            const data = snapshot.val();
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setAvatarURL(data.avatarURL);
        });
    }, []);

    // useEffect(() => {
    //     fetch()
    //     .then(response => response.json())
    //     .then(data => {
    //         setPosts(data.posts);
    //         setComments(data.comments));
    // })

    return (
        <>
            {(firstName && lastName && avatarURL) &&
            <Container className='main-view' id='profile-view' maxW='container' minH='90vh' p={0}>
                <Container maxW='container' bg='brand.100'>
                    <HStack justify='left' p={8} >
                        <Image
                            boxSize='150px'
                            objectFit='cover'
                            src={avatarURL}
                            fallbackSrc='https://bit.ly/dan-abramov'
                            alt='Dan Abramov'
                        />
                        <Box px={4}>
                            <HStack>
                                <Text fontSize='1.8em' fontWeight='700'>{`${firstName} ${lastName}`}</Text>
                                <EditDrawer handle={userData.handle} currFirstName={firstName} currLastName={lastName} avatarURL={avatarURL} />
                            </HStack>
                            <Text fontSize='0.9em' >{posts.length} posts | {comments.length} comments</Text>
                        </Box>
                        <Spacer />
                        <ButtonGroup variant='solid' spacing='4' size='md'>
                            <Button colorScheme='teal'><Icon as={FiShare} mr={2}/>Share</Button>
                            <Button colorScheme='facebook' ><Icon as={TbMessageCircle} mr={2}/>Message</Button>
                            {user && <Button colorScheme='red' variant='outline' onClick={() => handleLogOut({ setContext, navigate, toast })}>Log Out</Button>}
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
            </Container>}
        </>
    );
};

export default Profile;
